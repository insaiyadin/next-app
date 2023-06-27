function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>Main, not protected</div>
      {/* <div>{session?.user?.email}</div> */}
    </main>
  );
}

export default Home;
