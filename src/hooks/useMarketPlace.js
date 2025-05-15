import { useEffect, useState } from "react";
import { updateProperties } from "constants/properties.js";
import { getProperties } from "api/index.js";
// Stellar
import { FetchStellarContractAssets } from "modules/marketplace";
// Stellar

const API_STELLAR_EXPERT = process.env.REACT_APP_API_STELLAR_EXPERT

const useMarketPlace = () => {
  const [marketPlaceAssets, setMarketPlaceAssets] = useState([]);
  const [highlightedMarketplaceAssets, setHighlightedMarketplaceAssets] = useState([]);
  const [stellarContractAllAssets, setStellarContractAllAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setErrorFetching] = useState(false);

  const FetchStellarContractAllAssets = async () => {
    setLoading(true);
    try {
      // Stellar
      const stellarContractAssetsFetched = await FetchStellarContractAssets(API_STELLAR_EXPERT)
      // Stellar

      const stellarContractAllTokens = stellarContractAssetsFetched?.map((item, index) => ({
        ...item,
        type: "OPEN",
        location: "Dubai",
        media: "",
        collected: (
          (1000 - (item?.balance / 10000000))
        ) / 100,
        price: 1000000
      }));

      const stellarContractAllAssets = stellarContractAllTokens.filter(item => item.asset !== "XLM");

      setMarketPlaceAssets(stellarContractAllAssets.slice(1))         // Everything except the highligted asset
      setHighlightedMarketplaceAssets(stellarContractAllAssets[0]);   // Highligted asset
      setStellarContractAllAssets(stellarContractAllAssets);          // All Assets

      const dataToStore = {
        marketplaceAssets: stellarContractAllAssets.slice(1),
        highlightedMarketplaceAssets: stellarContractAllAssets[0],
        stellarContractAllAssets: stellarContractAllAssets,
      };

      const currentTime = new Date().getTime();
      sessionStorage.setItem("marketPlaceData", JSON.stringify(dataToStore));
      sessionStorage.setItem("marketPlaceTimestamp", currentTime.toString());
      
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setErrorFetching(true);
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("marketPlaceData");
    const storedTimestamp = sessionStorage.getItem("marketPlaceTimestamp");
    const currentTime = new Date().getTime();
    if (
      storedData &&
      storedTimestamp &&
      currentTime - parseInt(storedTimestamp) < 600000
    ) {
      const parsedData = JSON.parse(storedData);
      setMarketPlaceAssets(parsedData.marketplaceAssets);
      setHighlightedMarketplaceAssets(parsedData.highlightedMarketplaceAssets);
      setStellarContractAllAssets(parsedData.stellarContractAllAssets);
    } else {
      FetchStellarContractAllAssets();
    }
  }, []);

  return { loading, isError, marketPlaceAssets, highlightedMarketplaceAssets, stellarContractAllAssets };
};

export { useMarketPlace };
