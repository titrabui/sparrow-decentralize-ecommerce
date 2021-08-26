require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const _account = hre.web3.utils.toChecksumAddress(account.address);
    const balance = await hre.web3.eth.getBalance(_account);
    const balanceETH = hre.web3.utils.fromWei(balance, "ether");
    console.log(account.address, " : ", balanceETH, "ETH");
  }
});

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/8093c41eb8254f2cb0b994a8608bcf33`,
      accounts: [
        `0x1e34191a3a4b7a79f3852910537040673e3450cb5a3d28c459677adf931196a9`,
        `0x81a4b7b64677b6125427fb7f18080e199ffd24b0fb2f109143835076dab5d5b8`,
        `0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0`
      ],
    },
  },
  solidity: "0.8.4",
};
