<template>
  <div class="main">
    <div v-if="step == 1">
      <Access @unlock="unlock"></Access>
    </div>
    <div v-if="step == 2" style="padding-bottom: 90px">
      <div class="information">
      Voting session: March 22, 00:01  March 28, 23:59 - ENDED
      </div>
        <div class="box2">  
        <div class="header-text">1 NEAT = 1 VOTE</div> 
        <div class="boxess">
          <div class="box4">
          <div class="proposal">          Voting amount ($NEAT coins) should be returned </div>
          <div class="proposal1">          0 VOTES</div>
           <div class="btn" >  
        </div>      
         </div>  
           <div class="box3">
          <div class="proposal"> Voting amount ($NEAT coins) should be burned </div>
          <div class="proposal1">          3658 VOTES</div>
                    <div class="btn" >  
        </div>
         </div>      
        </div>
      </div> 
      </div>
    </div>

</template>

<script>
import Access from "./modules/access";
import EyeInput from "./modules/eyeInput";
import neatioapi from "neatioapi";
import axios from "axios";
const Utils = neatioapi.utils;
const Web3 = require("web3");
const web3 = new Web3("https://rpc.neatio.net");

export default {
  data() {
    return {
      step: 2,
      balance: "",
      fullbalance: "",
      address: null,
      addresss: null,
      shortAddress: null,
      privateKey: "",
      currentChainId: "",
      chainID: "0x203",
      votes1: "",
      votes2:"",
    };
  },

  components: {
    Access,
    EyeInput,
  },

  mounted() {
    this.connectAccount();
    this.initialize();
    this.checkWallet();
    this.getVotes1();
    this.getVotes2();

  },

  methods: {
    initialize() {
      ethereum.on("chainChanged", (_chainId) => {
        this.getGasPrice();
        this.getBalance();
      });

      ethereum.on("accountsChanged", (_accounts) => {
        this.address = _accounts[0];
        this.getBalance();
      });
    },

    checkWallet() {
      if (this.walletNF == null) {
        console.log("Wallet not found!");
      } else {
        console.log("Wallet was found.");
      }
    },

    strTrim(str) {
      str = str + "";
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    highlight(index) {
      this.curNav = index;
    },

    getLocaction() {
      this.isTestNetwork =
        window.location.hostname.substr(0, 4) === "test" ||
        window.location.hostname.substr(0, 4) === "loca";
    },

    async initialize() {
      this.currentChainId = await ethereum.request({ method: "eth_chainId" });
      ethereum.on("chainChanged", (_chainId) => {
        this.connectAccount(_chainId);
      });

      ethereum.on("accountsChanged", (_accounts) => {
        this.requestAccount();
      });

      this.requestAccount();
    },


    async requestAccount() {
      this.currentChainId = await ethereum.request({ method: "eth_chainId" });
      try {
        if (this.currentChainId !== this.chainId) {
          this.connectAccount();
        } else {
          this.addresss = `Neatio Network`;
          this.shortAddress = `${accounts[0].substr(
            0,
            6
          )}...${accounts[0].slice(-4)}`;
        }
      } catch (e) {
        console.log("request accounts error:");
      }
    },

    async connectAccount() {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        this.address = accounts[0];
        this.getBalance();
        this.getGasPrice();
        this.shortAddress = `${accounts[0].substr(0, 6)}...${accounts[0].slice(
          -4
        )}`;
      } catch (e) {
        console.log("request accounts error:", e);
      }
    },

    async switchToNeatio() {
      let chainIds = "0x203";
      let rpc = "https://rpc.neatio.net";
      let browser = "https://rpc.neatio.net";
      let chainName = "Neatio Network";

      try {
        this.currentChainId = await ethereum.request({ method: "eth_chainId" });
        if (this.currentChainId === chainIds) {
          window.alert("Neatio Network has been added to Metamask.");
        }

        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIds }],
        });
      } catch (e) {
        if (e.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainIds,
                  chainName: chainName,
                  nativeCurrency: {
                    name: "NEAT",
                    symbol: "NEAT",
                    decimals: 18,
                  },
                  rpcUrls: [rpc],
                  blockExplorerUrls: [browser],
                },
              ],
            });

            this.currentChainId = await ethereum.request({
              method: "eth_chainId",
            });
          } catch (e) {
            console.log("add network error", e);
          }
        }
      }
    },

    getBalance() {
      ethereum
        .request({
          method: "eth_getBalance",
          params: [this.address],
        })
        .then((result) => {
          this.balance = Utils.toNEAT(result);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },

    getGasPrice() {
      ethereum
        .request({
          method: "eth_gasPrice",
          params: [],
        })
        .then((result) => {
          console.log("gasprice", result);
          this.price = Utils.toNEAT(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },









  },
};
</script>

<style scoped>
@media only screen and (max-width: 800px) {
  .main {
    width: 80%;
    padding: 10px;
  }
  .right {
    width: 100%;
  }

}
@media only screen and (max-width: 560px) {
  .menu,
  .main,
  .right {
    width: auto;
    padding: 10px;
  }

  button {
  border: none;
  min-width: 30px;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  color: #00ffff;
  box-shadow: inset 0 0 0.1em #00ffff, 0 0 0.1em #00ffff;
  border: #00ffff solid 1px;
  background-color: #24292f;
  border-radius: 4px;
  outline: none;
  margin: 0px 0px 0px 60px;
}

  .information{
  text-align: center;
  min-height: 10vh;
  font-family: Pirulen !important;
  font-size: 1.1rem;
}

  .boxess {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

}

  
}

button {
  border: none;
  min-width: 40px;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  color: #00ffff;
  box-shadow: inset 0 0 0.1em #00ffff, 0 0 0.1em #00ffff;
  border: #00ffff solid 1px;
  background-color: #24292f;
  border-radius: 4px;
  outline: none;
  margin: 0px 0px 0px 60px;
}

.main {
  padding: 40px 10px;
}

::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  text-align: center;
}
.proposal{
 text-align: center;
 margin: 20px;
}

.information1{
  text-align: center;
  min-height: 10vh;
  margin-top: 20px;
  font-family: Pirulen !important;
  color: #fff;
  font-size: 20px;
}

.proposal1{
 text-align: center;
 margin: 24px;
 color: antiquewhite;
}

.boxess {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 20px 0px;
}

.box3{
  border-left: 1px solid #00ffff;
}

.header-text{
  text-align: center;
  font-family: Pirulen !important;
}

.btn {
  display: flex;

}
#gtButton {
  width: 100px;
  height: 36px;
  color: #000000;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #00ffff;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: bold;
}

#gtButton2 {
  width: 100px;
  height: 36px;
  color: #fff;
  border: 2px solid #00ffff;
  box-shadow: 0 0 40px #00bfff7e;
  border-radius: 10px;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: bold;
}

.information{
  text-align: center;
  min-height: 140px;
  font-family: Pirulen !important;
  font-size: 1.1rem;
}

#gtButton:hover {
  background-color: #00ffff !important;
}
</style>

<style>
.el-message-box__message p {
  margin: 0 !important;
  line-height: 24px !important;
}
.el-message-box__title {
  text-align: center !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.el-message-box__message {
  text-align: center !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>

