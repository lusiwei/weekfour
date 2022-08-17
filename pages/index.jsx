import { useState } from "react";
import { Input } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import NFTCard from "../components/NFTCard";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "Jk_aQr1bqeRWhBH8f0Zv0nlvioYr2oj6";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET"
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET"
      };
      const api_key = "Jk_aQr1bqeRWhBH8f0Zv0nlvioYr2oj6";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3 h-100 my-auto">
      <div className="flex flex-col w-1/2 justify-center items-center gap-y-2">
        <Input
          type="text"
          placeholder="Add your wallet address"
          onChange={e => {
            console.log("wallet address:", e);
            setWalletAddress(e);
          }}
          // value={wallet}
          className=""
        />
        <Input
          type={"text"}
          placeholder="Add the collection address"
          onChange={e => {
            console.log("e.target.value", e);
            setCollectionAddress(e.target.value);
          }}
          // value={collection}
        ></Input>
        <label className="text-gray-600 ">
          <input
            type={"checkbox"}
            className="mr-2"
            onChange={e => {
              console.log("e",e);
              setFetchForCollection(e.target.checked);
            }}
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else {
              fetchNFTs();
            }
          }}
        >
          Let's go!{" "}
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
      {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  );
};

export default Home;
