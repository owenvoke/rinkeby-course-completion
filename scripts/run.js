const main = async () => {
    const [owner, randoPerson] = await hre.ethers.getSigners();
    const courseCompletionPortalFactory = await hre.ethers.getContractFactory('CourseCompletionPortal');
    const CourseCompletionContract = await courseCompletionPortalFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await CourseCompletionContract.deployed();

    console.log("Contract deployed to:", CourseCompletionContract.address);
    console.log("Contract deployed by:", owner.address);

    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(
            CourseCompletionContract.address
        ))
    );

    let courseCompletionCount;
    await CourseCompletionContract.getTotalCourseCompletions();

    let courseCompletionTxn = await CourseCompletionContract.completeCourse('My First Course...');
    await courseCompletionTxn.wait();

    await CourseCompletionContract.getTotalCourseCompletions();

    courseCompletionTxn = await CourseCompletionContract.connect(randoPerson).completeCourse('My Second Course...');
    await courseCompletionTxn.wait();

    await CourseCompletionContract.getTotalCourseCompletions();

    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(
            CourseCompletionContract.address
        ))
    );

    let allCourseCompletions = await CourseCompletionContract.getAllCourseCompletions();
    console.log(allCourseCompletions);
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
