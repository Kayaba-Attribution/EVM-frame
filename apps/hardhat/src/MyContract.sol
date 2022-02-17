//SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {

    string public purpose;
    mapping (address => uint256) public deposited;

    event SetPurpose(address sender, string purpose);
    event Deposit(address user, uint256 value);
    event Withdraw(address user, uint256 value);
    constructor(string memory _purpose) {
        console.log("Deploying MyContract with purpose:", _purpose);
        purpose = _purpose;
    }

    function setPurpose(string memory _purpose) external {
        console.log("Changing purpose from '%s' to '%s'", purpose, _purpose);
        purpose = _purpose;
        emit SetPurpose(msg.sender, purpose);
    }

    function deposit() external payable {
        require(msg.value > 0, "cannot deposit 0");
        console.log("'%s deposits %s", msg.sender, msg.value);
        deposited[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(address payable _user, uint256 _amount) external {
        require(msg.sender == _user, "cannot withdraw others ETH");        
        require(deposited[msg.sender] >= _amount, "cannot withdraw more than you deposited");
        
        deposited[_user] -= _amount;
        (bool success, ) = _user.call{value: _amount}("");
        require(success, "unable to send value, recipient may have reverted");
        
        console.log("'%s withdraws %s", _user, _amount);
        emit Withdraw(_user, _amount);
    }

    function depositBalance(address _user) public view returns(uint256) {
        return deposited[_user];
    }
}
