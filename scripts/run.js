const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy();
	await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
	console.log("Contract deployed by:", owner.address);
	
	let txn = await domainContract.register("zralkh");
	await txn.wait();

  const domainAddress = await domainContract.getAddress("zralkh");
  console.log("Owner of domain zralkh:", domainAddress);
	
	// Trying to set a record that doesn't belong to me!
  txn = await domainContract.connect(owner).setRecord("zralkh", "Haha my domain now!");
  await txn.wait();
}

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