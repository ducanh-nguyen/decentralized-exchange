//Importing ethers module from hardhat
const { ethers } = require("hardhat");
//Importing expect module from chai
const { expect } = require("chai");

const tokens = (n) => {
	//Converting Ethers unit
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Token", () => {
	let token

	beforeEach(async () => {
		//Fetch Token from Blockchain
		const Token = await ethers.getContractFactory("Token")
		token = await Token.deploy('Duck Token', 'DUCK', '1000000')
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
		//Check Symbol Name is Correct
		expect(await token.decimals()).to.equal(decimals)
	})

	it("Has correct total supply", async () => {
		//Check totalSupply Name is Correct
		expect(await token.totalSupply()).to.equal(totalSupply)
	})
})

})
