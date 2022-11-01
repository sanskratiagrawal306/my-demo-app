import React, { useContext, useState } from "react";
import UnbxdSearchWrapper from "@unbxd-ui/react-search-sdk";
import ProductsListing from "./components/ProductsListing";
import SpellChecker from "./components/SpellChecker";
import SearchBar from "./components/SearchBar";
import Paginator from "./components/Paginator";
import Sorter from "./components/Sorter";
import MerchandizingBanner from "./components/MerchandizingBanner";
import TextFilters from "./components/TextFilters";
import RangeFilters from "./components/RangeFilters";
import MultilevelFilters from "./components/MultilevelFilters";
import ActiveFilters from "./components/ActiveFilters";
import Crumbs from "./components/Crumbs";
import SearchDescription from "./components/SearchDescription";
import ProductViewTypes from "./components/ProductViewTypes";
import ProductsSize from "./components/ProductsSize";
import "@unbxd-ui/react-search-sdk/public/dist/css/core.css";
import "@unbxd-ui/react-search-sdk/public/dist/css/theme.css";

import "./demo.scss";
import { ProductTypeContext } from './context';
import Home from './Home';

const siteKeyRugsUsa = "prod-rugsusa808581564092094";
const apiKeyRugsUsa = "ea4823934059ff8ad5def0be04f8dd4e";

const siteKeyDemo = "demo-unbxd700181503576558";
const apiKeyDemo = "fb853e3332f2645fac9d71dc63e09ec1";

const siteKeyWildearth = "wildearthclone-neto-com-au808941566310465";
const apiKeyWildearth = "e6959ae0b643d51b565dc3e01bf41ec1";

const UNBXD_SITE_KEY = "ss-unbxd-as814131659518951";
const UNBXD_API_KEY = "f2613b5146ded7f5c5b66abedb8dba90";

export default function Demo() {
  const { productType, setProductType } = useContext(ProductTypeContext);
  const [showFilters, setShowFilters] = useState(false);
  const [refreshId, setRefreshId] = useState(1);

  const handleShow = () => setShowFilters(true);

  return (
    <UnbxdSearchWrapper siteKey={siteKeyWildearth} apiKey={apiKeyWildearth}>
      <SearchBar 
      onProductTypeChange={setProductType}
      productType={productType}
      handleShow={handleShow}
      refreshId={refreshId}
      setRefreshId={setRefreshId} />

      <Home  />

      {/* <div className="UNX-search__container">
        <div className="UNX-searchMeta__container">
          <Crumbs />
          <div className="UNX-searchMeta__more">
            <ActiveFilters />
            <ProductViewTypes />
          </div>
        </div>
        <div className="UNX-searchResults__container">
          <div className="UNX-searchFacet__container">
            <MultilevelFilters />
            <RangeFilters />
            <TextFilters />
          </div>

          <div className="UNX-searchResult__container">
            <MerchandizingBanner />
            <SearchDescription />
            <SpellChecker />

            <div className="UNX-searchHeader__container">
              <Sorter />
              <ProductsSize />
              <Paginator />
            </div>

            <ProductsListing />

            <Paginator />
          </div>
        </div>
      </div> */}
    </UnbxdSearchWrapper>
  );
}
