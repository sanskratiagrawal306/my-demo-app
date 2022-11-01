import { useEffect, useState,  useRef } from 'react';

export default function Vanilla(props) {

    const {
        sites = [],
        apiKey = 'f2613b5146ded7f5c5b66abedb8dba90',
        mappedFields = {
            "title": "name",
            "sku": "sku",
            "imageUrl": "damImageUrl",
            "productUrl": "url",
            "price": "price",
            "brand": "brand",
            "rating": "reviewAvgRating",
            "size": "size",
            "badges": "brand",
            "sellingPrice": "sellingPrice",
            "gender": "gender"
        },
        variantsConfig = {
            "enabled": false,
            "count": 10,
            "groupBy": "",
            "attributes": [
                "name",
                "sku",
                "vDamImageUrl",
                "url",
                "vPrice",
                "brand",
                "reviewAvgRating",
                "size",
                "brand",
                "sellingPrice",
                "gender"
            ],
            "mapping": {
                "title": "name",
                "sku": "sku",
                "imageUrl": "vDamImageUrl",
                "productUrl": "url",
                "price": "vPrice",
                "brand": "brand",
                "rating": "reviewAvgRating",
                "size": "size",
                "badges": "brand",
                "sellingPrice": "sellingPrice",
                "gender": "gender"
            }
        },
        unbxdAutoConfig = {
            "sideContentOn": "right",
            "template": "2column",
            "mainTpl": [
                "inFields",
                "keywordSuggestions",
                "topQueries",
                "promotedSuggestions"
            ]
        },
        previewDataLoaded = false,
        language,
      } = props;

    let [ scriptsCounter, setScriptsCounter ] = useState(0);
    const counterRef = useRef(0);

    const handleExternalScriptLoad = () => {
        counterRef.current = counterRef.current + 1;
        setScriptsCounter(counterRef.current);
    };

    const CSS_URLS = [
        "//cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.5.0/nouislider.min.css",
        "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.theme.min.css",
        "//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css",
        // "//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css",
        // "//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
        "//cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css",
        "//libraries.unbxdapi.com/search-sdk/v2.0.5/vanillaSearch.min.css"
    ];

    /** Order to be maintained. Autosuggest requires jquery and handlebars. */
    const JS_URLS = [ "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.5.3/handlebars.min.js",
        "//cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        "//libraries.unbxdapi.com/sdk-assets/jquery.ui.widget.js",
        "//libraries.unbxdapi.com/sdk-assets/jquery.ui.mouse.js",
        "//cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.5.0/nouislider.min.js",
        "//libraries.unbxdapi.com/unbxdAutosuggest_v1.1.js",
        "//libraries.unbxdapi.com/search-sdk/v2.0.13/vanillaSearch.min.js",
        "//cdn.jsdelivr.net/npm/choices.js@9.0.1/public/assets/scripts/choices.min.js",
    ];

    const createMarkup = function () {
        return {
            __html: "<div class='search-preview' id='search-preview-debugger'>" +
                "      <div class='UNX-results-container' id='UNX-results-container-debugger' >" +
                "       " +
                "        <div class='UNX-head-wrapper' id='UNX-head-wrapper-debug'>" +
                "            <div class='UNX-selected-actions'>" +
                "                <div class='UNX-bread-wrapper' id='breadcrumpContainer'></div>" +
                "                <div class='UNX-selected-facet-wrapper' id='selectedFacetWrapper'></div>" +
                "            </div>" +
                "        </div>" +
                "        <div class='UNX-result-header'>" +
                "                    <div id='didYouMeanWrapper'></div>" +
                "                    <div class='UNX-result-right'>" +
                "                        <div class='UNX-change-products' id='changeNoOfProducts'></div>" +
                "                        <div class='UNX-sort-wrapper' id='sortWrapper'></div>" +
                "                        <div id='' class='UNX-change-pagination-wrap unxPagination'></div>" +
                "                        <div class='UNX-product-type-block' id='productViewTypeContainer'></div>" +
                "                    </div>" +
                "        </div>" +
                "        <div class='UNX-product-results' id='UNX-product-results-debugger'>" +
                "            <div class='UNX-facet-wrapper' >" +
                "                <div class='UNX-facet-head'>" +
                "                    <h2 class='UNX-filter-header'>Filter By</h2>" +
                "                    " +
                "                </div>" +
                "                <div class='UNX-fxd-facet' id='UNX-fxd-facet-debug'>" +
                "                    <div class='UNX-selected-facet-wrapper UNX-selected-f-m' id='selectedMFacetWrapper'></div>" +
                "                    <div class='UNX-multilevel-block' id='bucketedFacetWrapper'></div>" +
                "                    <div class='UNX-text-facet-block' id='facetsWrapper'></div>" +
                "                    <div class='UNX-range-block' id='rangeFacetWrapper'></div>" +
                "                    <div class='UNX-m-facet-row'>" +
                "                        <button data-action='applyFacets' class='UNX-primary-btn UNX-facet-trigger'>Apply</button>" +
                "                        <button data-action='clearFacets' class='UNX-default-btn UNX-facet-trigger'>Clear</button>" +
                "                    </div>" +

                "                </div>" +
                "                <div class='UNX-m-facet-row'>" +
                "                    <button class='UNX-m-facet-btn UNX-facet-trigger fa fa-filter'></button>" +
                "                </div>" +
                "            </div>" +
                "            <div class='UNX-product-list'>" +
                "               " +
                "                <div id='bannerContainer'></div>" +
                "                <div class='UNX-product-wrapper' id='searchResultsWrapper'></div>" +
                "                <div id='' class='UNX-change-pagination-wrap UNX-m-page unxPagination'></div>" +
                "            </div>" +
                "        </div>" +
                "        <div class='UNX-loader-container' id='loaderEl'></div>" +
                "        <div id='noResultWrapper'></div>" +
                "        " +
                "        <div id='clickScrollContainer'>" +
                "        </div>" +
                "    </div>" +
                "    " +
                "</div>"
        };
    }

    window.UNBXD_SITE_KEY = 'ss-unbxd-as814131659518951';
  window.UNBXD_API_KEY = 'f2613b5146ded7f5c5b66abedb8dba90';
  window.UNBXD_SEARCH_URL = 'https://search.unbxd.io';
  window.UNBXD_MAPPED_FIELDS = mappedFields;
  window.UNBXD_VARIANTS_CONFIG = variantsConfig;
  window.UNBXD_AUTO_CONFIG = unbxdAutoConfig;
  window.LANGUAGE = 'en';

    const addStyles = () => {
        CSS_URLS.forEach((url, ind) => {
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;
            link.id = "previewCss" + ind;
            document.head.appendChild(link);
        });

        {
            /* Add the template specific styles */
            let url = `./vanilla/unbxdStyles.css`;
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;
            link.id = "previewCssStyles";
            document.head.appendChild(link);
        }

        {
            /* Add the required font */
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href =
                "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&display=swap";
            link.id = "previewFontBarlow";
            document.head.appendChild(link);
        }

        // DO NOT DELETE THIS
        // {
        //   if (window.UNBXD_USER) {
        //     let url = `${BASE_PATH}/sdk-demo/debug/debugProcessor.css`;
        //     let link = document.createElement("link");
        //     link.rel = "stylesheet";
        //     link.id = "previewDebuggerCss";
        //     link.href = url;
        //     document.head.appendChild(link);
        //   }
        // }
        // DO NOT DELETE THIS
    };

    const addScripts = () => {
        JS_URLS.forEach((url, ind) => {
            let script = document.createElement("script");
            script.src = url;
            script.async = false;
            script.onload = handleExternalScriptLoad(url);
            script.id = "previewSearch" + ind;
            document.head.appendChild(script);
        });
    };

    const cleanUpHTML = () => {
        let previewJs = document.querySelectorAll('[id^="previewSearch"]');
        previewJs.forEach((item) => {
            item.parentNode.removeChild(item);
        });

        let previewCSS = document.querySelectorAll('[id^="previewCss"]');
        previewCSS.forEach((item) => {
            item.parentNode.removeChild(item);
        });

        let previewFont = document.querySelectorAll('[id^="previewFont"]');
        previewFont.forEach((item) => {
            item.parentNode.removeChild(item);
        });
    };

    useEffect(() => {
        cleanUpHTML();
        addStyles();
        addScripts();

        return cleanUpHTML;
    }, []);

    // useEffect(() => {
    //     const searchTriggerScript = document.getElementById("previewSearchTrigger");
    //     if (searchTriggerScript) {
    //         searchTriggerScript.parentNode.removeChild(searchTriggerScript);
    //     }

    //     /** Config can call search only after Search script has executed */
    //     if (
    //         // previewDataLoaded &&
    //         // scriptsCounter % JS_URLS.length === 0 &&
    //         // scriptsCounter !== 0 &&
    //         // Object.keys(mappedFields).length &&
    //         // apiKey
    //         true
    //     ) {
    //         let scriptUtils = document.createElement("script");
    //         scriptUtils.src = './vanillaUtils/index.js';
    //         scriptUtils.async = false;
    //         scriptUtils.id = "previewSearchUtils";
    //         document.head.appendChild(scriptUtils);

    //         let script = document.createElement("script");
    //         script.src = `./vanilla/unbxdInit.js`;
    //         script.async = false;
    //         script.id = "previewSearchTrigger";
    //         document.head.appendChild(script);

    //         // DO NOT DELETE THIS
    //         // if (window.UNBXD_USER) {
    //         //   let script = document.createElement("script");
    //         //   script.src = `${BASE_PATH}/sdk-demo/debug/debugProcessor.js`;
    //         //   script.async = false;
    //         //   script.id = "previewSearchDebug";
    //         //   document.head.appendChild(script);
    //         // }
    //         // DO NOT DELETE THIS
    //     }
    // }, [
    //     scriptsCounter,
    //     mappedFields,
    //     apiKey,
    //     previewDataLoaded,
    //     window.showPreviewDebugger,
    // ]);


     useEffect(() => {
        const searchTriggerScript = document.getElementById("previewSearchTrigger");
        if (searchTriggerScript) {
            searchTriggerScript.parentNode.removeChild(searchTriggerScript);
        }

        /** Config can call search only after Search script has executed */
        if (
            scriptsCounter % JS_URLS.length === 0 &&
            scriptsCounter !== 0 &&
            Object.keys(mappedFields).length
        ) {
            let scriptUtils = document.createElement("script");
            scriptUtils.src = '/vanillaUtils.js';
            scriptUtils.async = false;
            scriptUtils.id = "previewSearchUtils";
            document.head.appendChild(scriptUtils);

            let script = document.createElement("script");
            script.src = `/unbxdInit.js`;
            script.async = false;
            script.id = "previewSearchTrigger";
            document.head.appendChild(script);

            // DO NOT DELETE THIS
            // if (window.UNBXD_USER) {
            //   let script = document.createElement("script");
            //   script.src = `${BASE_PATH}/sdk-demo/debug/debugProcessor.js`;
            //   script.async = false;
            //   script.id = "previewSearchDebug";
            //   document.head.appendChild(script);
            // }
            // DO NOT DELETE THIS
        }
    }, [
        scriptsCounter,
    mappedFields,
    apiKey,
    previewDataLoaded,
    window.showPreviewDebugger,
    ]);


    return (
        <div>
            <div dangerouslySetInnerHTML={createMarkup()} ></div>
        </div>
    )
}