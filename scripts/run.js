const main = async () => {
    const [owner, randoPerson] = await hre.ethers.getSigners();
    const courseCompletionPortalFactory = await hre.ethers.getContractFactory('CourseCompletionPortal');
    const CourseCompletionContract = await courseCompletionPortalFactory.deploy();
    await CourseCompletionContract.deployed();

    console.log("Contract deployed to:", CourseCompletionContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await CourseCompletionContract.getTotalWaves();

    let waveTxn = await CourseCompletionContract.wave();
    await waveTxn.wait();

    waveCount = await CourseCompletionContract.getTotalWaves();

    waveTxn = await CourseCompletionContract.connect(randoPerson).wave();
    await waveTxn.wait();

    waveCount = await CourseCompletionContract.getTotalWaves();
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
