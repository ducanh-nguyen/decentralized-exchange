//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
	string public name = "Duck Token";
	string public symbol = "DUCK";
	uint256 public decimals = 18;
	uint256 public totalSupply;
	mapping(address => uint256) public balanceOf;

	constructor(
		string memory _name,
		string memory _symbol,
		uint256 _totalSupply)
	{
		name = _name;
		symbol = _symbol;
		totalSupply = _totalSupply * (10**decimals);
		balanceOf[msg.sender] = totalSupply;
	}
}


