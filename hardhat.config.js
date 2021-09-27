require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.4",
    networks: {
        rinkeby: {
            url: process.env.RINKEBY_ALCHEMY_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
