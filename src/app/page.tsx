
export default function Home() {



  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
    <div className="flex justify-center mt-10">
      <h1 className="font-semibold text-7xl font-serif" >Welcome to Illini Marketplace</h1>
    </div>
    <div className="flex justify-center mt-10">
      <div className="w-1/2 rounded p-4 bg-white">
        <p className="text-lg font-serif">illini marketplace is a new platform for UIUC students to 
                           sublease apartments, sell textbooks, parking spaces, or anything listed 
                           in the categories above. It is completely free and restricted to students only.
                           To sell something, just make an account with your illinois email and navigate to Sell
                           in the top right. 
         </p>
         <p className="text-lg font-serif mt-1 font-bold"> More features and updates coming soon</p>
      </div>
    </div>
    </>
  );
}
