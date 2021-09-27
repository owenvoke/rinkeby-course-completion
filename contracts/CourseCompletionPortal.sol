// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CourseCompletionPortal {
    uint256 totalCompletions;

    event NewCourseCompletion(address indexed from, uint256 timestamp, string courseName);

    struct CompletedCourse {
        address user;
        string courseName;
        uint256 timestamp;
    }

    CompletedCourse[] courseCompletions;

    constructor() payable {
        console.log("This is the course completion smart contract");
    }

    function completeCourse(string memory _courseName) public {
        totalCompletions += 1;
        console.log("%s has completed a course!", msg.sender);

        courseCompletions.push(CompletedCourse(msg.sender, _courseName, block.timestamp));

        emit NewCourseCompletion(msg.sender, block.timestamp, _courseName);

        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than they contract has."
        );
        (bool success,) = (msg.sender).call{value : prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllCourseCompletions() public view returns (CompletedCourse[] memory) {
        return courseCompletions;
    }

    function getTotalCourseCompletions() public view returns (uint256) {
        console.log("We have %d total course completions!", totalCompletions);
        return totalCompletions;
    }
}
