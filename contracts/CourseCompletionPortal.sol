// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CourseCompletionPortal {
    uint256 totalCompletions;

    constructor() {
        console.log("This is the course completion smart contract");
    }

    function completeCourse() public {
        totalCompletions += 1;
        console.log("%s has completed the course!", msg.sender);
    }

    function getTotalCourseCompletions() public view returns (uint256) {
        console.log("We have %d total course completions!", totalCompletions);
        return totalCompletions;
    }
}
