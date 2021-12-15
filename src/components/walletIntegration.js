import { ethers } from 'ethers';

const config = {
  contractAddress: '0x5ea7ce7Dea15a674c38D398C774dE9d6E1CEA539',
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

function setupModals() {
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
}

async function openModal() {
  const modal = document.querySelector('.nft-modal');
  modal.classList.add('open');

  const modalContainer = modal.querySelector('.nft-modal-container');

  modalContainer.innerHTML = `
    <div class="nft-modal-content">
      <svg height="32" width="32">
        <circle cx="16" cy="16" fill="none" r="14" stroke="#34C77B" stroke-dasharray="87.96459430051421" stroke-dashoffset="74.76990515543707" stroke-width="4" class="nft-modal-stage-loading"></circle>
      </svg>
    </div>
  `;
  setupModals();

  function hideLoading() {
    modalContainer.innerHTML = `
      <div class="nft-modal-header">
        <div class="nft-modal-title">How many NFTs will you mint?</div>
        <div class="nft-modal-close nft-js-modal-close">&#10005;</div>
      </div>
      <div class="nft-modal-content"></div>
    `;
    setupModals();
  }

  function displayError(error) {
    modalContainer.innerHTML = `
      <div class="nft-modal-content">
        ${error}  <div class="nft-modal-close nft-js-modal-close">&#10005;</div>
      </div>
    `;
    setupModals();
  };

  if (!(await verifyWalletConnection())) {
    return displayError('Error with MetaMask. Please refresh and try again.');
  } 

  const contract = new ethers.Contract(config.contractAddress, config.contractABI, new ethers.providers.Web3Provider(window.ethereum));
  if (!(await contract.hasPresaleStarted())) {
    return displayError('Sorry, the NFTs are not for sale yet.');
  }

  if (!(await contract.hasPublicSaleStarted())) {
    if (!(await contract.presaleWhitelist(window.ethereum.selectedAddress))) {
      return displayError('Sorry, you are not whitelisted. Please wait for the public sale.');
    }
  }

  let maxValue;
  if (
    await contract.hasPublicSaleStarted()
  ) {
    maxValue = (await contract.maxTokensPerMint());
  } else {
    maxValue = (await contract.maxTokensPerWhitelistedAddress())
      .sub(await contract.presaleWhitelistPurchased(window.ethereum.selectedAddress));
  }
  
  hideLoading();
  const modalContent = modal.querySelector('.nft-modal-content');
  modalContent.innerHTML = `
    <div id="nft-mint-amount-input-container">
      <svg id="nft-mint-amount-input-arrow-left"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <g> <path d="M52.8,311.3c-12.8-12.8-12.8-33.4,0-46.2c6.4-6.4,14.7-9.6,23.1-9.6s16.7,3.2,23.1,9.6l113.4,113.4V32.7   c0-18,14.6-32.7,32.7-32.7c18,0,32.7,14.6,32.7,32.7v345.8L391,265.1c12.8-12.8,33.4-12.8,46.2,0c12.8,12.8,12.8,33.4,0,46.2   L268.1,480.4c-6.1,6.1-14.4,9.6-23.1,9.6c-8.7,0-17-3.4-23.1-9.6L52.8,311.3z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
      <svg id="nft-mint-amount-input-arrow-right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <g> <path d="M52.8,311.3c-12.8-12.8-12.8-33.4,0-46.2c6.4-6.4,14.7-9.6,23.1-9.6s16.7,3.2,23.1,9.6l113.4,113.4V32.7   c0-18,14.6-32.7,32.7-32.7c18,0,32.7,14.6,32.7,32.7v345.8L391,265.1c12.8-12.8,33.4-12.8,46.2,0c12.8,12.8,12.8,33.4,0,46.2   L268.1,480.4c-6.1,6.1-14.4,9.6-23.1,9.6c-8.7,0-17-3.4-23.1-9.6L52.8,311.3z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
      <input value=1 min=1 max=${maxValue} type="number" id="nft-mint-amount-input">
    </div>
    <button id="nft-mint-button">Mint</button>
  `;
  const mintAmountInput = modalContent.querySelector('#nft-mint-amount-input');

  modalContent.querySelector('#nft-mint-amount-input-arrow-left').addEventListener('click', () => {
    if (+mintAmountInput.value > +mintAmountInput.min) {
      mintAmountInput.value--;
    }
  });
  modalContent.querySelector('#nft-mint-amount-input-arrow-right').addEventListener('click', () => {
    if (+mintAmountInput.value < +mintAmountInput.max) {
      mintAmountInput.value++;
    }
  });

  const mintButton = modalContent.querySelector('#nft-mint-button');
  mintButton.addEventListener('click', async () => {
    mintButton.disabled = true;

    const mintAmount = +mintAmountInput.value;

    const iface = new ethers.utils.Interface(config.contractABI);
    const params = iface.encodeFunctionData('mint', [ethers.utils.hexlify(mintAmount)]);

    try {
      if (!(await verifyWalletConnection())) {
        return;
      }

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

      modalContent.innerHTML = `
        Transaction submitted. Please wait for confirmation.
        <br>
        Transaction hash: ${txHash}
        <br>
        <a target="_blank" href="${config.etherScanUrl}${txHash}">View on EtherScan</a>
        <br>
        <svg height="32" width="32">
          <circle cx="16" cy="16" fill="none" r="14" stroke="#34C77B" stroke-dasharray="87.96459430051421" stroke-dashoffset="74.76990515543707" stroke-width="4" class="nft-modal-stage-loading"></circle>
        </svg>
      `;

      try {
        const tx = await (new ethers.providers.Web3Provider(window.ethereum)).getTransaction(txHash);
        const txReceipt = await tx.wait();
        console.log(txReceipt);
        modalContent.innerHTML = `
          NFTs succesfully minted!
          <br>
          Transaction hash: ${txHash}
          <br>
          <a target="_blank" href="${config.etherScanUrl}${txHash}">View on EtherScan</a>
          <br>
          <a target="_blank" href="${config.openSeaUrl}">
            View your NFTs on OpenSea
          </a>
        `;
      } catch (err) {
        console.log(err);
        return displayError('There was an error with your transaction. Please try again.');
      }
    } catch (err) {
      // TODO handle error
      console.log('TX ERROR', err);
    }
    mintButton.disabled = false;
  });
}

async function verifyWalletConnection({ noAlert } = {}) {
  if (!window.ethereum) {
    // noAlert || alertUser('Please install MetaMask to interact with this feature');
    return;
  }

  if (!window.ethereum.selectedAddress && noAlert && localStorage.getItem('verifyWalletRequested') === '1') {
    return;
  }

  // localStorage.setItem('verifyWalletRequested', '1');
  let accounts;
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: config.networkParams.chainId }], // chainId must be in hexadecimal numbers
    });
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (window.ethereum.chainId != config.networkParams.chainId) {
      // noAlert || alertUser(`Please switch MetaMask network to ${config.networkName}`);
      return;
    }
  } catch (error) {
    if (error.code == -32002) {
      // noAlert || alertUser('Please open your MetaMask and select an account');
      return;
    } else if (error.code == 4001) {
      // noAlert || alertUser('Please connect with MetaMask');
      return;
    } else {
      throw error;
    }
  }

  return accounts[0];
}

export default {
  initialize() {
    verifyWalletConnection();

    setInterval(function updateConnectButton() {
      const button = document.querySelector('.navBar__walletBtn');
      const addr = window.ethereum.selectedAddress;
      if (button && addr) {
        const cropped = addr.slice(0, 5) + '...' + addr.slice(-5);
        button.innerHTML = cropped;
      } else {
        button.innerHTML = 'CONNECT WALLET';
      }
    }, 100);
  },
  async mintButtonOnClick() {
    if (await verifyWalletConnection()) {
      await openModal();
    }
  },
  async connectButtonOnClick() {
    const address = await verifyWalletConnection();
  },
  verifyWalletConnection
}
