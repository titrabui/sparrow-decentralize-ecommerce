async function main() {
  const ECommerce = await ethers.getContractFactory("ECommerce");
  const eCommerce = await ECommerce.deploy();

  console.log("ECommerce deployed to:", eCommerce.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
