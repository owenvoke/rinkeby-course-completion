const main = async () => {
    const [owner, randoPerson] = await hre.ethers.getSigners();
    const courseCompletionPortalFactory = await hre.ethers.getContractFactory('CourseCompletionPortal');
    const CourseCompletionContract = await courseCompletionPortalFactory.deploy();
    await CourseCompletionContract.deployed();

    console.log("Contract deployed to:", CourseCompletionContract.address);
    console.log("Contract deployed by:", owner.address);

    let courseCompletionCount;
    courseCompletionCount = await CourseCompletionContract.getTotalCourseCompletions();

    let courseCompletionTxn = await CourseCompletionContract.completeCourse();
    await courseCompletionTxn.wait();

    courseCompletionCount = await CourseCompletionContract.getTotalCourseCompletions();

    courseCompletionTxn = await CourseCompletionContract.connect(randoPerson).completeCourse();
    await courseCompletionTxn.wait();

    courseCompletionCount = await CourseCompletionContract.getTotalCourseCompletions();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
