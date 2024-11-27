const express = require("express");
const {
  ethers,
  JsonRpcProvider,
  Wallet,
  Contract,
  parseEther,
} = require("ethers");
const { ERC20_ABI } = require("../abi/ERC20_ABI");
const { ADMIN_SECRET_KEY, ALCHEMY_URL } = require("../config/env");

const router = express.Router();

const ZOMBIE_TOKEN = "0x52bde3c82232ff2de09aa90d318bf124ee4d58b7";

router.post("/transfer-funds", async (req, res) => {
  if (!ADMIN_SECRET_KEY) {
    return res
      .status(500)
      .json({ message: "Server misconfigured. Missing ADMIN_SECRET_KEY." });
  }

  const { userWalletAddress, amount } = req.body;

  try {
    const provider = new JsonRpcProvider(ALCHEMY_URL);
    const wallet = new Wallet(ADMIN_SECRET_KEY, provider);

    const erc20Contract = new Contract(ZOMBIE_TOKEN, ERC20_ABI, wallet);

    console.log(
      "Initiating transfer to:",
      userWalletAddress,
      "Amount:",
      parseEther(`${amount}`)
    );

    const tx = await erc20Contract.transfer(
      userWalletAddress,
      parseEther(`${amount}`)
    );
    const receipt = await tx.wait();

    res.json({
      message: "Transaction mined successfully!",
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error("[DEBUG] Transfer failed:", error.message);
    res
      .status(500)
      .json({ message: "Failed to send transaction", error: error.message });
  }
});

router.get("/")

module.exports = router;
