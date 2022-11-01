import { useEffect } from 'react'

export default function Vanilla2(props) {

    useEffect(() => {
        // (function () {
        //     var UnbxdSiteName = "demo-unbxd700181503576558";
        //     var ubx = document.createElement("script");
        //     ubx.type = "text/javascript";
        //     ubx.async = true;
        //     ubx.src = "//d21gpk1vhmjuf5.cloudfront.net/unbxdAnalytics.js";
        //     (
        //         document.getElementsByTagName("head")[ 0 ] ||
        //         document.getElementsByTagName("body")[ 0 ]
        //     ).appendChild(ubx);
        // })();
        if (window.UnbxdSearch) {
            window.unbxdSearch = new window.UnbxdSearch({
                siteKey: "demo-unbxd700181503576558",
                apiKey: "fb853e3332f2645fac9d71dc63e09ec1",
                hashMode: false,
                updateUrls: true,
                searchTrigger: "click",
                products: {
                    productType: "SEARCH"
                }
            });

            window.unbxdSearch.updateConfig({
                searchBoxEl: document.getElementById("unbxdInput"),
                searchTrigger: "click",
                searchButtonEl: document.getElementById("searchBtn"),
                products: {
                    el: document.getElementById("searchResultsWrapper"),
                    productType: "SEARCH"
                },
                spellCheck: {
                    enabled: true,
                    el: document.getElementById("didYouMeanWrapper")
                },
                noResults: {
                    el: document.getElementById("noResultWrapper")
                },
                facet: {
                    facetsEl: document.getElementById("facetsWrapper"),
                    selectedFacetsEl: document.getElementById("selectedFacetWrapper")
                },
                pagination: {
                    el: document.querySelectorAll(".unxPagination"),
                    type: "FIXED_PAGINATION",
                    pageLimit: 4
                },
                breadcrumb: {
                    el: document.getElementById("breadcrumpContainer")
                },
                pagesize: {
                    el: document.getElementById("changeNoOfProducts")
                },

                sort: {
                    el: document.getElementById("sortWrapper"),
                    options: [
                        {
                            value: "sortPrice desc",
                            text: "Price High to Low"
                        },
                        {
                            value: "sortPrice asc",
                            text: " Price Low to High"
                        }
                    ]
                },
                loader: {
                    el: document.getElementById("loaderEl")
                },
                productView: {
                    el: document.getElementById("productViewTypeContainer"),
                    viewTypes: "GRID"
                },
                banner: {
                    el: document.getElementById("bannerContainer"),
                    count: 1
                },
                swatches: {
                    enabled: true,
                    attributesMap: {
                        swatchList: "color",
                        swatchImgs: "unbxd_color_mapping",
                        swatchColors: "color"
                    }
                }
            });
        }

    }, [])
    const createMarkup = function () {
        return {
            __html: "<!DOCTYPE html>" +
                "<html>" +
                "  <head>" +
                "    <title>Parcel Sandbox</title>" +
                "    <meta charset='UTF-8' />" +
                "    <meta name='viewport' content='width=device-width, initial-scale=1.0' />" +
                "    <link" +
                "      href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap'" +
                "      rel='stylesheet'" +
                "    />" +
                "    <link" +
                "      href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'" +
                "      rel='stylesheet'" +
                "    />" +
                "    <link" +
                "      href='https://libraries.unbxdapi.com/search-sdk/v2.0.1/vanillaSearch.min.css'" +
                "      rel='stylesheet'" +
                "    />" +
                //                 "    <script>" +
                //                 "      /* * * CONFIGURATION * * */" +
                //                 "      var UnbxdSiteName = 'demo-unbxd700181503576558';" +
                //                 "      (function () {" +
                //                 "        var ubx = document.createElement('script');" +
                //                 "        ubx.type = 'text/javascript';" +
                //                 "        ubx.async = true;" +
                //                 "        ubx.src = '//d21gpk1vhmjuf5.cloudfront.net/unbxdAnalytics.js';" +
                //                 "        (" +
                //                 "          document.getElementsByTagName('head')[0] ||" +
                //                 "          document.getElementsByTagName('body')[0]" +
                //                 "        ).appendChild(ubx);" +
                //                 "      })();" +
                //                 "    </script>" +
                //                 "    <script src='https://libraries.unbxdapi.com/search-sdk/v2.0.13/vanillaSearch.min.js'></script>" +
                //                 "<script>" +
                //                 "window.unbxdSearch = new UnbxdSearch({" +
                //                 "            siteKey: 'demo-unbxd700181503576558'," +
                //                 "            apiKey: 'fb853e3332f2645fac9d71dc63e09ec1'," +
                //                 "            hashMode: false," +
                //                 "            updateUrls: true," +
                //                 "            searchTrigger: 'click'," +
                //                 "            products: {" +
                //                 "                productType: 'SEARCH'" +
                //                 "            }" +
                //                 "        });" +

                // "        window.unbxdSearch.updateConfig({" +
                //                 "            searchBoxEl: document.getElementById('unbxdInput')," +
                //                 "            searchTrigger: 'click'," +
                //                 "            searchButtonEl: document.getElementById('searchBtn')," +
                //                 "            products: {" +
                //                 "                el: document.getElementById('searchResultsWrapper')," +
                //                 "                productType: 'SEARCH'" +
                //                 "            }," +
                //                 "            spellCheck: {" +
                //                 "                enabled: true," +
                //                 "                el: document.getElementById('didYouMeanWrapper')" +
                //                 "            }," +
                //                 "            noResults: {" +
                //                 "                el: document.getElementById('noResultWrapper')" +
                //                 "            }," +
                //                 "            facet: {" +
                //                 "                facetsEl: document.getElementById('facetsWrapper')," +
                //                 "                selectedFacetsEl: document.getElementById('selectedFacetWrapper')" +
                //                 "            }," +
                //                 "            pagination: {" +
                //                 "                el: document.querySelectorAll('.unxPagination')," +
                //                 "                type: 'FIXED_PAGINATION'," +
                //                 "                pageLimit: 4" +
                //                 "            }," +
                //                 "            breadcrumb: {" +
                //                 "                el: document.getElementById('breadcrumpContainer')" +
                //                 "            }," +
                //                 "            pagesize: {" +
                //                 "                el: document.getElementById('changeNoOfProducts')" +
                //                 "            }," +
                //                 "            sort: {" +
                //                 "                el: document.getElementById('sortWrapper')," +
                //                 "                options: [" +
                //                 "                    {" +
                //                 "                        value: 'sortPrice desc'," +
                //                 "                        text: 'Price High to Low'" +
                //                 "                    }," +
                //                 "                    {" +
                //                 "                        value: 'sortPrice asc'," +
                //                 "                        text: ' Price Low to High'" +
                //                 "                    }" +
                //                 "                ]" +
                //                 "            }," +
                //                 "            loader: {" +
                //                 "                el: document.getElementById('loaderEl')" +
                //                 "            }," +
                //                 "            productView: {" +
                //                 "                el: document.getElementById('productViewTypeContainer')," +
                //                 "                viewTypes: 'GRID'" +
                //                 "            }," +
                //                 "            banner: {" +
                //                 "                el: document.getElementById('bannerContainer')," +
                //                 "                count: 1" +
                //                 "            }," +
                //                 "            swatches: {" +
                //                 "                enabled: true," +
                //                 "                attributesMap: {" +
                //                 "                    swatchList: 'color'," +
                //                 "                    swatchImgs: 'unbxd_color_mapping'," +
                //                 "                    swatchColors: 'color'" +
                //                 "                }" +
                //                 "            }" +
                //                 "        });" +
                //                 "        </script>" +
                "  </head>" +

                "  <body>" +
                "    <div class='UNX-header'>" +
                "      <div class='UNX-header-inner'>" +
                "        <div class='UNX-logo'>" +
                "          UNBXD" +
                "        </div>" +
                "        <div class='UNX-input-wrapper'>" +
                "          <input id='unbxdInput' class='UNX-input' />" +
                "          <button id='searchBtn' class='fa fa-search UNX-search-btn'></button>" +
                "        </div>" +
                "      </div>" +
                "    </div>" +

                "    <div class='UNX-results-container'>" +
                "      <div class='UNX-head-wrapper'>" +
                "        <div class='UNX-selected-actions'>" +
                "          <div class='UNX-bread-wrapper' id='breadcrumpContainer'></div>" +
                "          <div" +
                "            class='UNX-selected-facet-wrapper'" +
                "            id='selectedFacetWrapper'" +
                "          ></div>" +
                "        </div>" +
                "        <div class='UNX-product-type-block' id='productViewTypeContainer'></div>" +
                "      </div>" +
                "      <div class='UNX-product-results'>" +
                "        <div class='UNX-facet-wrapper'>" +
                "          <h2 class='UNX-filter-header'>Filter By</h2>" +
                "          <div class='UNX-fxd-facet'>" +
                "            <div" +
                "              class='UNX-selected-facet-wrapper UNX-selected-f-m'" +
                "              id='selectedMFacetWrapper'" +
                "            ></div>" +
                "            <div class='UNX-multilevel-block' id='bucketedFacetWrapper'></div>" +
                "            <div class='UNX-text-facet-block' id='facetsWrapper'></div>" +
                "            <div class='UNX-range-block' id='rangeFacetWrapper'></div>" +
                "            <div class='UNX-m-facet-row'>" +
                "              <button" +
                "                data-action='applyFacets'" +
                "                class='UNX-primary-btn UNX-facet-trigger'" +
                "              >" +
                "                Apply" +
                "              </button>" +
                "              <button" +
                "                data-action='clearFacets'" +
                "                class='UNX-default-btn UNX-facet-trigger'" +
                "              >" +
                "                Clear" +
                "              </button>" +
                "            </div>" +
                "          </div>" +
                "          <div class='UNX-m-facet-row'>" +
                "            <button" +
                "              class='UNX-m-facet-btn UNX-facet-trigger fa fa-filter'" +
                "            ></button>" +
                "          </div>" +
                "        </div>" +
                "        <div class='UNX-product-list'>" +
                "          <div class='UNX-result-header'>" +
                "            <div id='didYouMeanWrapper'></div>" +
                "            <div class='UNX-result-right'>" +
                "              <div class='UNX-change-products' id='changeNoOfProducts'></div>" +
                "              <div class='UNX-sort-wrapper' id='sortWrapper'></div>" +
                "              <div" +
                "                class='UNX-change-pagination-wrap'" +
                "                id='paginationContainer'" +
                "              ></div>" +
                "              <div id='' class='UNX-change-pagination-wrap unxPagination'></div>" +
                "            </div>" +
                "          </div>" +
                "          <div id='bannerContainer'></div>" +
                "          <div class='UNX-product-wrapper' id='searchResultsWrapper'></div>" +
                "          <div" +
                "            id=''" +
                "            class='UNX-change-pagination-wrap UNX-m-page unxPagination'" +
                "          ></div>" +
                "        </div>" +
                "      </div>" +
                "      <div class='UNX-loader-container' id='loaderEl'></div>" +
                "      <div id='noResultWrapper'></div>" +
                "      <div id='clickScrollContainer'></div>" +
                "    </div>" +
                "  </body>" +
                "</html>"

        }
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={createMarkup()} ></div>
        </div>
    )
}