require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
const secret = require('./secret.json');
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
      url: secret.url,
      accounts: [secret.key]
    }
  },
  solidity: "0.8.4",
};
