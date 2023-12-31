//Importing ethers module from hardhat
const { ethers } = require("hardhat");
//Importing expect module from chai
const { expect } = require("chai");

const tokens = (n) => {
	//Converting Ethers unit
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Token", () => {
	let token, accounts, deployer, receiver, exchange

	beforeEach(async () => {
		//Fetch Token from Blockchain
		const Token = await ethers.getContractFactory("Token")
		token = await Token.deploy('Duck Token', 'DUCK', '1000000')
		accounts = await ethers.getSigners()
		deployer = accounts[0]
		receiver = accounts[1]
		exchange = accounts[2]
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

describe('Sending Tokens', () => {
	let amount, transaction, result

	describe('Success', () => {
		beforeEach(async () => {
		//Transfer tokens
		amount = tokens(100)
		transaction = await token.connect(deployer).transfer(receiver.address, amount)
		result = await transaction.wait()
		})

		it('Transfers token balances', async () => {

		//Ensure token were transfered (balance changed)
		expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
		expect(await token.balanceOf(receiver.address)).to.equal(amount)
		})

		it('Emit a Transfer event', async () => {
		const event = result.events[0]
		expect(event.event).to.equal('Transfer')

		const args = event.args
		expect(args.from).to.equal(deployer.address)
		expect(args.to).to.equal(receiver.address)
		expect(args.value).to.equal(amount)
		})
	})

	describe('Failure', () => {
		it('Rejects insufficient balances', async () => {
			//Transfer more tokens that deployer has - 100M
			const invalidAmount = tokens(100000000)
			await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
			})

		it('Rejects invalid recipient', async () => {
			const amount = tokens(100)
			await expect(token.connect(deployer).transfer('0x0000000000000000000000000', amount)).to.be.reverted
			})
		})
	})

describe('Approving Tokens', () => {
    let amount, transaction, result

    beforeEach(async () => {
      amount = tokens(100)
      transaction = await token.connect(deployer).approve(exchange.address, amount)
      result = await transaction.wait()
    })

    describe('Success', () => {
      it('Allocates an allowance for delegated token spending', async () => {
        expect(await token.allowance(deployer.address, exchange.address)).to.equal(amount)
      })

      it('Emits an Approval event', async () => {
        const event = result.events[0]
        expect(event.event).to.equal('Approval')

        const args = event.args
        expect(args.owner).to.equal(deployer.address)
        expect(args.spender).to.equal(exchange.address)
        expect(args.value).to.equal(amount)
      })

    })

    describe('Failure', () => {
      it('Rejects invalid spenders', async () => {
        await expect(token.connect(deployer).approve('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
      })
    })
  })
describe('Delegated token transfer', () => {
	let amount, transaction, result

	beforeEach(async () => {
		amount = tokens(100)
		transaction = await token.connect(deployer).approve(exchange.address, amount)
		result = await transaction.wait()
    })

	describe('Success', () => {
		beforeEach(async () => {
		amount = tokens(100)
		transaction = await token.connect(exchange).transferFrom(deployer.address, receiver.address, amount)
		result = await transaction.wait()
    })

	it('Transfers token balances', async() => {
		expect(await token.balanceOf(deployer.address)).to.be.equal(ethers.utils.parseUnits("999900", "ether"))
		expect(await token.balanceOf(receiver.address)).to.be.equal(amount)	
	})

	it('Resets allowance', async () => {
		expect(await token.allowance(deployer.address, exchange.address)).to.be.equal(0)
	})

  	it('Emits a Transfer event', async () => {
	const event = result.events[0]
	expect(event.event).to.equal('Transfer')

	const args = event.args
	expect(args.from).to.equal(deployer.address)
	expect(args.to).to.equal(receiver.address)
	expect(args.value).to.equal(amount)
      })

	})

	describe('Failure', async () => {
		// Attempt to transfer too many tokens
      const invalidAmount = tokens(100000000) // 100 Million, greater than total supply
      await expect(token.connect(exchange).transferFrom(deployer.address, receiver.address, invalidAmount)).to.be.reverted
	})
	})
})


