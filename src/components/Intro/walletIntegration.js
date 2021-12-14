import { ethers } from 'ethers';

const config = {
  contractAddress: '0xC34E33ab918361cF12606D1aD303E93DBE881882',
  // networkName: 'Ethereum Mainnet',
  networkName: 'Ethereum Testnet Rinkeby',
  // etherScanUrl: 'https://etherscan.io/tx/',
  etherScanUrl: 'https://rinkeby.etherscan.io/tx/',
  // openSeaUrl: 'https://opensea.io/account?search[sortBy]=CREATED_DATE&search[sortAscending]=false',
  openSeaUrl: 'https://testnets.opensea.io/account?search[sortBy]=CREATED_DATE&search[sortAscending]=false',
  networkParams: {
    // chainId: '0x1'
    chainId: '0x4'
  },
  contractABI: [
    "function maxTokensPerWhitelistedAddress() public view returns (uint256)",
    "function maxTokensPerMint() public view returns (uint256)",
    "function tokenPrice() public view returns (uint256)",
    "function presaleWhitelist(address _address) public view returns (bool)",
    "function presaleWhitelistPurchased(address _address) public view returns (uint256)",
    "function hasPresaleStarted() public view returns (bool)",
    "function hasPublicSaleStarted() public view returns (bool)",
    "function mint(uint256 amount) external payable",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
    "function balanceOf(address owner) external view returns (uint256 balance)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)"
  ]
}

function html(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild; 
}

function alertUser(message) {
  alert(message);
}

async function openModal({ stages }) {
  const modal = document.querySelector('.nft-modal');
  modal.classList.add('open');

  modal.querySelector('.nft-modal-content').innerHTML = '';

  const stageTemplate = html(`
    <div class="nft-modal-stage">
      <div style="display:flex">
        <svg height="32" width="32">
          <circle cx="16" cy="16" fill="white" r="15" stroke="#E5E8EB" stroke-dasharray="96.76105373056564" stroke-dashoffset="0" stroke-width="2"></circle>
          <circle cx="16" cy="16" fill="none" r="14" stroke="#34C77B" stroke-dasharray="87.96459430051421" stroke-dashoffset="74.76990515543707" stroke-width="4" class="nft-modal-stage-loading"></circle>
          
          <text class="ActionProgress--step" dominant-baseline="middle" fill="#04111D" text-anchor="middle" x="50%" y="53%">1</text>
          
          <g class="nft-modal-stage-success">
            <circle cx="16" cy="16" fill="#34C77B" r="15" stroke="#34C77B" stroke-dasharray="96.76105373056564" stroke-dashoffset="0" stroke-width="2"></circle>
            <path d="M 10 16 l 4 4 l 8 -8" fill="none" stroke="white" stroke-width="2"></path>
          </g>
        </svg>
        <div class="nft-modal-stage-title"></div>
      </div>
      <div class="nft-modal-stage-description"></div>
      <button class="nft-modal-stage-action-button"></button>
    </div>
  `);

  const startLoading = stageEl => stageEl.querySelector('svg .nft-modal-stage-loading').style.display = 'initial';
  const stopLoading = stageEl => stageEl.querySelector('svg .nft-modal-stage-loading').style.display = 'none';
  
  const context = {};
  for (const [i, stage] of stages.entries()) {
    const stageEl = stageTemplate.cloneNode(true);
    stageEl.setAttribute('data-stage', i);
    stageEl.querySelector('.nft-modal-stage-title').innerText = stage.title;
    stageEl.querySelector('.nft-modal-stage-description').style.display = 'none';
    stageEl.querySelector('svg .nft-modal-stage-loading').style.display = 'none';
    stageEl.querySelector('svg .nft-modal-stage-success').style.display = 'none';
    stageEl.querySelector('.nft-modal-stage-action-button').style.display = 'none';
    stageEl.querySelector('.nft-modal-stage-action-button').addEventListener('click', async function (e) {
      e.preventDefault();
      this.disabled = true;
      startLoading(stageEl);
      await stage.action(context);
      stopLoading(stageEl);
      if (stage.retryResolve) {
        stage.retryResolve();
      }
    })
    stageEl.querySelector('svg text').innerHTML = 1+i;
    modal.querySelector('.nft-modal-content').appendChild(stageEl);
  }

  for (let i = 0; i < stages.length; i++) {
    if (i > 0) {
      modal.querySelector(`[data-stage="${i - 1}"]`).querySelector('.nft-modal-stage-description').style.display = 'none';
    }

    const stage = stages[i];
    const stageEl = modal.querySelector(`[data-stage="${i}"]`);
    startLoading(stageEl);

    if (stage.getBeforeDescription) {
      stageEl.querySelector('.nft-modal-stage-description').innerHTML = stage.getBeforeDescription(context);
      stageEl.querySelector('.nft-modal-stage-description').style.display = 'initial';
    }

    const result = await stage.beforeAction(context);
    if (result === true) {
      // stage complete
    } else {
      stopLoading(stageEl);

      stageEl.querySelector('.nft-modal-stage-description').innerHTML = result.description;
      stageEl.querySelector('.nft-modal-stage-description').style.display = 'initial';
      if (result.actionText) {
        stageEl.querySelector('.nft-modal-stage-action-button').innerHTML = result.actionText;
        stageEl.querySelector('.nft-modal-stage-action-button').style.display = 'initial';
        stage.action = result.action;
        await new Promise(resolve => {
          stage.retryResolve = () => {
            stageEl.querySelector('.nft-modal-stage-action-button').disabled = false;
            resolve();
          }
        });
      } else if (result.retryInterval) {
        await new Promise(resolve => setTimeout(resolve, result.retryInterval));  
      } else if (result.isFinal) {
        stageEl.querySelector('.nft-modal-stage-action-button').innerHTML = 'Close';
        stageEl.querySelector('.nft-modal-stage-action-button').style.display = 'initial';
        stage.action = () => document.querySelector('.nft-modal-close.nft-js-modal-close').click();
        if (result.isFinalSuccess) {
          stageEl.querySelector('svg .nft-modal-stage-success').style.display = 'initial';
        }
        return;
      } else {
        throw new Error('Invalid result');
      }
      
      startLoading(stageEl);
      i--;
      continue;
    }
    
    stopLoading(stageEl);
    stageEl.querySelector('.nft-modal-stage-action-button').style.display = 'none';
    stageEl.querySelector('svg .nft-modal-stage-success').style.display = 'initial';
  }
}

async function verifyWalletConnection({ noAlert } = {}) {
  if (!window.ethereum) {
    noAlert || alertUser('Please install MetaMask to interact with this feature');
    return;
  }

  if (!window.ethereum.selectedAddress && noAlert && localStorage.getItem('verifyWalletRequested') === '1') {
    return;
  }

  localStorage.setItem('verifyWalletRequested', '1');

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (window.ethereum.chainId != config.networkParams.chainId) {
      noAlert || alertUser(`Please switch MetaMask network to ${config.networkName}`);
      return;
    }
  } catch (error) {
    if (error.code == -32002) {
      noAlert || alertUser('Please open your MetaMask and select an account');
      return;
    } else if (error.code == 4001) {
      noAlert || alertUser('Please connect with MetaMask');
      return;
    } else {
      throw error;
    }
  }

  return true;
}

export default {
  initialize() {
    ;(function setupModals() {
      /* Get close button */
      var closeButton = document.getElementsByClassName('nft-js-modal-close');
      var closeOverlay = document.getElementsByClassName('nft-js-modal-overlay');

      /* Set onclick event handler for close buttons */
      for(var i = 0; i < closeButton.length; i++) {
        closeButton[i].onclick = function() {
          var modalWindow = this.closest('.nft-modal');

          modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }   

      /* Set onclick event handler for modal overlay */
      for(var i = 0; i < closeOverlay.length; i++) {
        closeOverlay[i].onclick = function() {
          var modalWindow = this.closest('.nft-modal');

          modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }
    })();
  },
  async mintButtonOnClick() {
    const amountInput = document.querySelector('.intro__mintAmountInput input');

    const mintAmount = +amountInput.value;

    if (!Number.isInteger(mintAmount)) {
      alertUser('Mint amount must be an integer');
      return;
    }
    
    if (mintAmount < 1) {
      alertUser('You must mint at least one token');
      return;
    }

    // if (mintAmount > config.maxTokensPerMint) {
    //   alertUser(`You can mint at most ${config.maxTokensPerMint} tokens`);
    //   return;
    // }

    await openModal({
      stages: [
      {
          title: `Connect MetaMask to ${config.networkName}`,
          beforeAction: async ctx => {

            if (!window.ethereum) {                
              return { 
                description: `
                  MetaMask not installed. <a target="_blank" href="https://metamask.io/download.html">Download here</a>
                  <br>
                  If metamask is already installed, please ensure plugin is enabled.
                `,
                action: () => window.location.reload(),
                actionText: 'Retry'
              };
            }

            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

              if (window.ethereum.chainId != config.networkParams.chainId) {
                return { 
                  description: `
                    Please switch MetaMask network to ${config.networkName}
                  `,
                  action: async () => {},
                  actionText: 'Retry'
                };
              }
            } catch (error) {
              if (error.code == -32002) {
                return { 
                  description: `
                    Please open your MetaMask and select an account
                  `,
                  action: async () => {},
                  actionText: 'Retry'
                };
              } else if (error.code == 4001) {
                return { 
                  description: `
                    Please open your MetaMask and select an account
                  `,
                  action: async () => {},
                  actionText: 'Retry'
                };
              } else {
                throw error;
              }
            }
            
            return true;
          },
        },
        {
          title: 'Checking whitelist status',
          beforeAction: async ctx => {
            ctx.selectedAddress = window.ethereum.selectedAddress;
            if (!(await verifyWalletConnection()) || ctx.selectedAddress != window.ethereum.selectedAddress) {
              return { isFinal: true, description: 'Error with MetaMask. Please refresh and try again.' };
            }

            const contract = new ethers.Contract(config.contractAddress, config.contractABI, new ethers.providers.Web3Provider(window.ethereum));
            if (!(await contract.hasPresaleStarted())) {
              return { 
                description: `
                  Sorry, the NFTs are not for sale yet.
                `,
                isFinal: true
              };
            }

            const maxPerMint = (await contract.maxTokensPerMint());

            if (maxPerMint.lt(mintAmount)) {
              return { 
                description: `You are trying to mint more tokens than the max allowed per transaction. Please choose at most ${maxPerMint} for the mint amount.`,
                isFinal: true
              };
            }

            if (!(await contract.hasPublicSaleStarted())) {
              if (!(await contract.presaleWhitelist(window.ethereum.selectedAddress))) {
                return { 
                  description: `
                    Sorry, you are not whitelisted. Please wait for the public sale.
                  `,
                  isFinal: true
                }
              } else if (
                (await contract.presaleWhitelistPurchased(window.ethereum.selectedAddress))
                .gte(await contract.maxTokensPerWhitelistedAddress())
              ) {
                return { 
                  description: `You have minted the max amount of tokens for this address. Please wait for the public sale to mint more.`,
                  isFinal: true
                };
              }
            }

            return true;
          },
        },
        {
          title: 'Mint your tokens',
          beforeAction: async ctx => {
            if (!(await verifyWalletConnection()) || ctx.selectedAddress != window.ethereum.selectedAddress) {
              return { isFinal: true, description: 'Error with MetaMask. Please refresh and try again.' };
            }

            if (ctx.mintTransactionHash) {
              return true;
            }

            return {
              description: 'Submit a transaction with your wallet to mint your NFTs.',
              actionText: 'Mint',
              action: async ctx => {
                const iface = new ethers.utils.Interface(config.contractABI);
                const params = iface.encodeFunctionData('mint', [ethers.utils.hexlify(mintAmount)]);

                try {
                  if (!(await verifyWalletConnection())) {
                    return;
                  }

                  const contract = new ethers.Contract(config.contractAddress, config.contractABI, new ethers.providers.Web3Provider(window.ethereum));

                  const requiredAmount = (await contract.tokenPrice()).mul(mintAmount);
                  const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [
                      {
                        from: window.ethereum.selectedAddress,
                        to: config.contractAddress,
                        value: requiredAmount.toHexString(),
                        data: params
                      },
                    ],
                  });

                  ctx.mintTransactionHash = txHash;
                  return true;
                } catch (err) {
                  // TODO handle error
                  console.log('TX ERROR', err);
                }
              }
            };
          },
        },
        {
          title: 'Wait for the transaction to complete',
          getBeforeDescription: ctx => {
            return `
              Transaction is pending. Please wait for it to complete. 
              <br>
              Transaction hash: ${ctx.mintTransactionHash}
              <br>
              <a target="_blank" href="${config.etherScanUrl}${ctx.mintTransactionHash}">View on EtherScan</a>
            `;
          },
          beforeAction: async ctx => {
            if (!(await verifyWalletConnection()) || ctx.selectedAddress != window.ethereum.selectedAddress) {
              return { isFinal: true, description: 'Error with MetaMask. Please refresh and try again.' };
            }
            try {
              const tx = await (new ethers.providers.Web3Provider(window.ethereum)).getTransaction(ctx.mintTransactionHash);
              const txReceipt = await tx.wait();
              console.log(txReceipt);
              return {
                description: `
                  Transaction complete.
                  <br>
                  Transaction hash: ${ctx.mintTransactionHash}
                  <br>
                  <a target="_blank" href="${config.etherScanUrl}${ctx.mintTransactionHash}">View on EtherScan</a>
                  <br>
                  <a target="_blank" href="${config.openSeaUrl}">
                    View your NFTs on OpenSea
                  </a>
                `,
                isFinal: true,
                isFinalSuccess: true
              }
            } catch (err) {
              console.log(err);
              return {
                description: 'There was an error with your transaction. Please refresh and try again.',
                isFinal: true
              }
            }
          }
        },
      ]
    });
  }
}