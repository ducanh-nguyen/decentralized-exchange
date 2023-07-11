//Importing ethers module from hardhat
const { ethers } = require("hardhat");
//Importing expect module from chai
const { expect } = require("chai");

const tokens = (n) => {
	//Converting Ethers unit
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Token", () => {
	let token, accounts, deployer

	beforeEach(async () => {
		//Fetch Token from Blockchain
		const Token = await ethers.getContractFactory("Token")
		token = await Token.deploy('Duck Token', 'DUCK', '1000000')

		accounts = await ethers.getSigners()
		deployer = accounts[0]
	})

describe("Deployment", () => {
	const name = 'Duck Token'
	const symbol = 'DUCK'
	const decimals = '18'
	const totalSupply = tokens('1000000')

	it("Has correct name", async () => {
	//Check Token Name is Correct
	expect(await token.name()).to.equal(name)
	})

	it("Has correct symbol", async () => {
		//Check Symbol Name is Correct
		expect(await token.symbol()).to.equal(symbol)
	})

	it("Has correct decimals", async () => {
		//Check Decimals is Correct
		expect(await token.decimals()).to.equal(decimals)
	})

	it("Has correct total supply", async () => {
		//Check totalSupply is Correct
		expect(await token.totalSupply()).to.equal(totalSupply)
	})

	it("Assigns totalSupply to deployer", async () => {
		//Check totalSupply to deployer
		expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
	})
})

})



