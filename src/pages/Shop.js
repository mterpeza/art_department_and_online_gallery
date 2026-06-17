import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { assetUrl } from "../utils/assets";
import { CONTACT_MAILTO } from "../utils/contact";
import { trackProductView, trackContactClick } from "../utils/analytics";
import GalleryLightbox from "../components/GalleryLightbox";
import { personalProducts } from "../data/products";

const _TC_BASE =
  "/images/portfolio/collaboration/ordinary%20pals/tradingCards/";
const tradingCardGroups = [
  {
    label: "Product Photo",
    images: ["/images/Store/other/OP_80AD_tradingCards/IMG_1214.jpeg"],
  },
  { label: "Chopper", images: [_TC_BASE + "Series_1_Chopper.png"] },
  { label: "Francis Dak", images: [_TC_BASE + "Series_1_Francis_Dak.png"] },
  { label: "Lug Dugler", images: [_TC_BASE + "Series_1_Lug_Dugler.png"] },
  {
    label: "Terry Heathers",
    images: [_TC_BASE + "Series_1_Terry_Heathers.png"],
  },
  { label: "Trapped", images: [_TC_BASE + "Series_1_Trapped.png"] },
  { label: "Billy Bell", images: [_TC_BASE + "Series_2_Billy_Bell.png"] },
  { label: "Burger Time", images: [_TC_BASE + "Series_2_Burger_Time.png"] },
  { label: "Butter", images: [_TC_BASE + "Series_2_Butter.png"] },
  { label: "Garth Lungey", images: [_TC_BASE + "Series_2_Garth_Lungey.png"] },
  { label: "Jed Weaverson", images: [_TC_BASE + "Series_2_Jed_Weaverson.png"] },
  { label: "Doris Gurney", images: [_TC_BASE + "Series_3_Doris_Gurney.png"] },
  {
    label: "Grunk Scgruggins",
    images: [_TC_BASE + "Series_3_Grunk_Scgruggins.png"],
  },
  { label: "Jerry", images: [_TC_BASE + "Series_3_Jerry.png"] },
  { label: "Selfie", images: [_TC_BASE + "Series_3_Selfie.png"] },
  { label: "The Stevies", images: [_TC_BASE + "Series_3_The_Stevies.png"] },
];

const _CD_BASE = "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/";
const cooperIllustrationGroups = [
  {
    label: "Illustration 1",
    productId: "cooper-diers-illustration-1",
    images: [_CD_BASE + "21a.jpeg", _CD_BASE + "21b.jpeg"],
  },
  {
    label: "Illustration 2",
    productId: "cooper-diers-illustration-2",
    images: [_CD_BASE + "19a.jpeg", _CD_BASE + "19b.jpeg"],
  },
  {
    label: "Illustration 3",
    productId: "cooper-diers-illustration-3",
    images: [_CD_BASE + "9a.jpeg", _CD_BASE + "9b.jpeg"],
  },
  {
    label: "Illustration 4",
    productId: "cooper-diers-illustration-4",
    images: [_CD_BASE + "10a.jpeg", _CD_BASE + "10b.jpeg"],
  },
  {
    label: "Illustration 5",
    productId: "cooper-diers-illustration-5",
    images: [_CD_BASE + "2a.jpeg", _CD_BASE + "2b.jpeg"],
  },
  {
    label: "Illustration 6",
    productId: "cooper-diers-illustration-6",
    images: [_CD_BASE + "3a.jpeg", _CD_BASE + "3b.jpeg"],
  },
  {
    label: "Illustration 7",
    productId: "cooper-diers-illustration-7",
    images: [_CD_BASE + "4a.jpeg", _CD_BASE + "4b.jpeg"],
  },
  {
    label: "Illustration 8",
    productId: "cooper-diers-illustration-8",
    images: [_CD_BASE + "5a.jpeg", _CD_BASE + "5b.jpeg"],
  },
  {
    label: "Illustration 9",
    productId: "cooper-diers-illustration-9",
    images: [_CD_BASE + "6a.jpeg", _CD_BASE + "6b.jpeg"],
  },
  {
    label: "Illustration 10",
    productId: "cooper-diers-illustration-10",
    images: [_CD_BASE + "7a.jpeg", _CD_BASE + "7b.jpeg"],
  },
  {
    label: "Illustration 11",
    productId: "cooper-diers-illustration-11",
    images: [_CD_BASE + "8a.jpeg", _CD_BASE + "8b.jpeg"],
  },
  {
    label: "Illustration 12",
    productId: "cooper-diers-illustration-12",
    images: [_CD_BASE + "11a.jpeg", _CD_BASE + "11b.jpeg"],
  },
  {
    label: "Illustration 13",
    productId: "cooper-diers-illustration-13",
    images: [_CD_BASE + "1a.jpeg", _CD_BASE + "1b.jpeg"],
  },
  {
    label: "Illustration 14",
    productId: "cooper-diers-illustration-14",
    images: [_CD_BASE + "22a.jpeg", _CD_BASE + "22b.jpeg"],
  },
  {
    label: "Illustration 15",
    productId: "cooper-diers-illustration-15",
    images: [_CD_BASE + "23a.jpeg", _CD_BASE + "23b.jpeg"],
  },
  {
    label: "Illustration 16 - unframed",
    productId: "cooper-diers-illustration-16",
    images: [_CD_BASE + "13.jpg"],
  },
  {
    label: "Illustration 17 - unframed",
    productId: "cooper-diers-illustration-17",
    images: [_CD_BASE + "14.jpg"],
  },
  {
    label: "Illustration 18 - unframed",
    productId: "cooper-diers-illustration-18",
    images: [_CD_BASE + "15.jpg"],
  },
  {
    label: "Illustration 19 - unframed",
    productId: "cooper-diers-illustration-19",
    images: [_CD_BASE + "24.jpg"],
  },
];

const collaborationProducts = [
  {
    id: "cooper-diers-ordinary-pals-original-illustrations",
    name: "Cooper Diers: Ordinary Pals - Original Illustrations",
    year: "2018",
    image: "/images/Store/other/IMG_0015.jpeg",
    illustrationGroups: cooperIllustrationGroups,
    galleryImages: [
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/1a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/1b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/2a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/2b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/3a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/3b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/4a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/4b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/5a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/5b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/6a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/6b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/7a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/7b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/8a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/8b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/9a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/9b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/10a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/10b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/11a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/11b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/13.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/14.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/15.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/19a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/19b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/21a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/21b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/22a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/22b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/23a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/23b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/24.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/_More%20Butter.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/_Racing%20Day.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/Art%20Show.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/art_show.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/art_show_2.jpg",
    ],
    soldOut: false,
  },
  {
    id: "sure-print",
    name: "80AD Gallery: Limited Edition Sure! Print",
    year: "2018",
    image: "/images/Store/other/OP_80AD_surePrint/_SURE!.jpeg",
    galleryImages: [
      "/images/Store/other/OP_80AD_surePrint/_SURE!.jpeg",
      "/images/Store/other/OP_80AD_surePrint/IMG_0063.jpeg",
    ],
    soldOut: true,
    showSoldOutBanner: true,
    detailPage: true,
  },
  {
    id: "trading-cards",
    name: "80AD Gallery: Ordinary Pals Trading Cards - Series 1",
    year: "2018",
    showSoldOutBanner: true,
    image: "/images/Store/other/OP_80AD_tradingCards/IMG_1214.jpeg",
    illustrationGroups: tradingCardGroups,
    galleryImages: [
      "/images/Store/other/OP_80AD_tradingCards/IMG_1214.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Chopper.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Francis_Dak.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Lug_Dugler.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Terry_Heathers.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Trapped.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Billy_Bell.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Burger_Time.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Butter.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Garth_Lungey.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Jed_Weaverson.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Doris_Gurney.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Grunk_Scgruggins.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Jerry.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Selfie.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_The_Stevies.png",
    ],
    soldOut: true,
  },
];

const stickerProducts = [
  {
    id: "lurker-sticker",
    name: "Lurker",
    image: "/images/Store/stickers/sticker_link.png",
    galleryImages: ["/images/Store/stickers/sticker_link.png"],
    comingSoon: true,
    detailPage: true,
  },
  {
    id: "help-the-helper-sticker",
    name: "Help the Helper",
    image: "/images/portfolio/mspaint/IMG_5366.JPG",
    galleryImages: ["/images/portfolio/mspaint/IMG_5366.JPG"],
    comingSoon: true,
    detailPage: true,
  },
  {
    id: "party-mode-sticker",
    name: "Party Mode",
    image: "/images/portfolio/mspaint/IMG_2821.JPG",
    galleryImages: ["/images/portfolio/mspaint/IMG_2821.JPG"],
    comingSoon: true,
    detailPage: true,
  },
];

function CooperDiersGridModal({ product, onClose, onOpenGroup }) {
  if (!product) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-black/90 backdrop-blur-sm">
      {/* Fixed header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur border-b border-white/10">
        <h2 className="text-white font-semibold text-base md:text-lg leading-tight">
          {product.name}
        </h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white text-2xl leading-none px-2"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      {/* Scrollable grid — fresh mount always starts at scrollTop 0 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
          {(product.illustrationGroups || []).map((group) =>
            group.productId ? (
              <Link
                key={group.label}
                to={`/shop/${group.productId}`}
                className="relative group rounded-lg overflow-hidden bg-gray-900 border border-white/10 hover:border-white/30 transition aspect-square"
                aria-label={"View " + group.label}
              >
                <img
                  src={assetUrl(group.images[0])}
                  alt={group.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/55 px-2 py-1.5">
                  <p className="text-white text-[11px] font-semibold truncate text-left">
                    {group.label}
                  </p>
                </div>
              </Link>
            ) : (
              <button
                key={group.label}
                type="button"
                onClick={() => onOpenGroup(group)}
                className="relative group rounded-lg overflow-hidden bg-gray-900 border border-white/10 hover:border-white/30 transition aspect-square"
                aria-label={"View " + group.label}
              >
                <img
                  src={assetUrl(group.images[0])}
                  alt={group.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/55 px-2 py-1.5">
                  <p className="text-white text-[11px] font-semibold truncate text-left">
                    {group.label}
                  </p>
                  {group.images.length > 1 && (
                    <p className="text-white/60 text-[10px]">View more</p>
                  )}
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ProductGrid({
  products,
  onOpenGallery,
  onOpenGrid,
  visibleElements = {},
  highlightedId = null,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <article
          key={product.id}
          id={`product-card-${product.id}`}
          data-animate="true"
          className={`store-card rounded-xl shadow-sm overflow-hidden ${
            product.soldOut
              ? "border border-gray-200 dark:border-gray-700 bg-[rgba(214,41,41,0.09)] dark:bg-[rgba(214,41,41,0.2)]"
              : "border border-gray-200 dark:border-gray-700 bg-[rgba(76,187,23,0.1)] dark:bg-[rgba(76,187,23,0.2)]"
          }${highlightedId === product.id ? " product-highlight" : ""}`}
          style={{
            borderBottomWidth: "0.5px",
            opacity: visibleElements[`product-card-${product.id}`] ? 1 : 0,
            transform: visibleElements[`product-card-${product.id}`]
              ? "translateY(0) scale(1)"
              : "translateY(14px) scale(0.97)",
            transition:
              "transform 320ms cubic-bezier(0.34, 1.2, 0.64, 1), opacity 280ms ease",
          }}
        >
          <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
            {product.detailPage ? (
              <Link
                to={`/shop/${product.id}`}
                className="block w-full h-full"
                aria-label={`View ${product.name} details`}
              >
                <img
                  src={assetUrl(product.image)}
                  alt={product.name}
                  className="block w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>
            ) : (
              <button
                type="button"
                className="block w-full h-full"
                onClick={() =>
                  product.illustrationGroups
                    ? onOpenGrid(product)
                    : onOpenGallery(product, 0)
                }
                aria-label={`Open ${product.name} gallery`}
              >
                <img
                  src={assetUrl(product.image)}
                  alt={product.name}
                  className="block w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            )}
            {product.showSoldOutBanner && (
              <div className="pointer-events-none absolute -right-12 top-3 w-44 rotate-[36deg] bg-red-700/85 text-white text-xs font-black uppercase tracking-[0.14em] text-center py-1.5">
                Sold Out
              </div>
            )}
          </div>
          <div
            className="px-4 pb-4 pt-0 border-t border-gray-200 dark:border-gray-700"
            style={{ borderTopWidth: "0.125px" }}
          >
            <h3 className="mt-2.5 font-semibold">{product.name}</h3>
            {product.year && (
              <p className="mt-1">
                <span className="inline-flex items-center rounded-full border border-[#6cebe4]/50 bg-[#6cebe4]/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.14em] text-[#256c68] dark:text-[#8df5ef]">
                  {product.year}
                </span>
              </p>
            )}
            {product.orderUrl ? (
              <>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1 font-semibold">
                  Vinyl · outdoor quality
                </p>
                <a
                  href={product.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-900/80 px-3.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm transition-all hover:-translate-y-[1px] hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow"
                >
                  Order
                </a>
              </>
            ) : product.comingSoon ? (
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1 font-semibold">
                Print to order coming soon
              </p>
            ) : product.soldOut ? (
              <p className="text-sm text-red-700 dark:text-red-400 mt-1 font-semibold">
                {product.showSoldOutBanner ? "Sold Out" : "Sold"}
              </p>
            ) : (
              <>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1 font-semibold">
                  Contact for price
                </p>
                <a
                  href={CONTACT_MAILTO}
                  className="mt-2 inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-900/80 px-3.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm transition-all hover:-translate-y-[1px] hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow"
                  onClick={() => trackContactClick("shop_card")}
                >
                  Contact
                </a>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Shop() {
  const location = useLocation();
  const galleryOverlayRef = useRef(null);
  const touchStartXRef = useRef(null);
  const swipeThreshold = 40;
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [visibleElements, setVisibleElements] = useState({});
  const [cooperGridProduct, setCooperGridProduct] = useState(null);
  const [cooperGridKey, setCooperGridKey] = useState(0);
  const [gridReturnProduct, setGridReturnProduct] = useState(null);
  const [gridGroups, setGridGroups] = useState([]);
  const [gridGroupIndex, setGridGroupIndex] = useState(-1);
  const [highlightedId, setHighlightedId] = useState(null);

  // Scroll to and highlight a product card when arriving via a hash link
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    const productId = hash.slice(1);
    // Give the page and its entrance animations time to settle before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(`product-card-${productId}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(productId);
      setTimeout(() => setHighlightedId(null), 2200);
    }, 650);
    return () => clearTimeout(timer);
  }, [location.hash]);

  // Auto-open a grid when arriving via ?openGrid=<product-id>
  useEffect(() => {
    const openGridId = new URLSearchParams(location.search).get("openGrid");
    if (!openGridId) return;
    const product = collaborationProducts.find((p) => p.id === openGridId);
    if (product) {
      setCooperGridProduct(product);
      setCooperGridKey((k) => k + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allProducts = useMemo(
    () => [...personalProducts, ...collaborationProducts, ...stickerProducts],
    [],
  );

  const activeImages = useMemo(
    () => activeProduct?.galleryImages || [],
    [activeProduct],
  );
  const isGalleryOpen = Boolean(activeProduct && activeImages.length > 0);

  const openGallery = (product, index) => {
    setActiveProduct(product);
    setActiveImageIndex(index);
    trackProductView(product.id, product.name);
  };

  const closeGallery = () => {
    setActiveProduct(null);
    setActiveImageIndex(0);
    if (gridReturnProduct) {
      setCooperGridProduct(gridReturnProduct);
      setCooperGridKey((k) => k + 1);
      setGridReturnProduct(null);
      setGridGroups([]);
      setGridGroupIndex(-1);
    }
  };

  const openCooperGrid = (product) => {
    setCooperGridProduct(product);
    setCooperGridKey((k) => k + 1);
  };
  const closeCooperGrid = () => setCooperGridProduct(null);

  const navigateToGroup = (index, groups, returnTo) => {
    const group = groups[index];
    setGridGroupIndex(index);
    setActiveImageIndex(0);
    setActiveProduct({
      id: group.label,
      name: group.label,
      galleryImages: group.images,
    });
    if (returnTo !== undefined) setGridReturnProduct(returnTo);
    if (groups !== undefined) setGridGroups(groups);
  };

  const openGroupFromGrid = (group) => {
    const returnTo = cooperGridProduct;
    const groups = returnTo?.illustrationGroups || [];
    const index = groups.indexOf(group);
    closeCooperGrid();
    setGridReturnProduct(returnTo);
    setGridGroups(groups);
    setGridGroupIndex(index);
    openGallery(
      { id: group.label, name: group.label, galleryImages: group.images },
      0,
    );
  };

  const nextImage = () => {
    if (!activeImages.length) return;
    const nextIdx = activeImageIndex + 1;
    if (nextIdx >= activeImages.length && gridGroups.length > 0) {
      const nextGroup = gridGroupIndex + 1;
      if (nextGroup < gridGroups.length) navigateToGroup(nextGroup, gridGroups);
    } else {
      setActiveImageIndex(nextIdx % activeImages.length);
    }
  };

  const prevImage = () => {
    if (!activeImages.length) return;
    if (activeImageIndex === 0 && gridGroups.length > 0) {
      const prevGroup = gridGroupIndex - 1;
      if (prevGroup >= 0) {
        const group = gridGroups[prevGroup];
        setGridGroupIndex(prevGroup);
        setActiveProduct({
          id: group.label,
          name: group.label,
          galleryImages: group.images,
        });
        setActiveImageIndex(group.images.length - 1);
      }
    } else {
      setActiveImageIndex(
        (activeImageIndex - 1 + activeImages.length) % activeImages.length,
      );
    }
  };

  const handleLightboxTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleLightboxTouchEnd = (event) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) return;
    const deltaX = touchEndX - touchStartXRef.current;
    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX > 0) {
      prevImage();
    } else {
      nextImage();
    }
    touchStartXRef.current = null;
  };

  useEffect(() => {
    const productId = location.hash.replace(/^#/, "");
    if (!productId) return;

    const product = allProducts.find((entry) => entry.id === productId);
    if (!product) return;

    setActiveProduct(product);
    setActiveImageIndex(0);
  }, [allProducts, location.hash]);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px 20px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscroll;
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      galleryOverlayRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [isGalleryOpen, activeImageIndex]);

  return (
    <main
      className={`fade-in ${
        isGalleryOpen
          ? "w-screen h-screen overflow-hidden p-0 m-0"
          : "container mx-auto p-6"
      }`}
    >
      <header
        id="store-header"
        data-animate="true"
        className="mb-6"
        style={{
          opacity: visibleElements["store-header"] ? 1 : 0.3,
          transform: visibleElements["store-header"]
            ? "translateY(0)"
            : "translateY(20px)",
          transition:
            "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
        }}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-[#6cebe4] font-semibold mb-2">
          Store
        </p>
        <h1 className="text-3xl font-bold mb-2">Online Store</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to the Art Department Store. Please reach out if you're
          interested in purchasing any artwork or have any questions.
        </p>
      </header>

      <section
        id="personal-section"
        data-animate="true"
        className="mb-10"
        style={{
          opacity: visibleElements["personal-section"] ? 1 : 0.3,
          transform: visibleElements["personal-section"]
            ? "translateY(0)"
            : "translateY(20px)",
          transition:
            "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Personal Artwork</h2>
        <ProductGrid
          products={personalProducts}
          onOpenGallery={openGallery}
          visibleElements={visibleElements}
          highlightedId={highlightedId}
        />
      </section>

      <section
        id="collaborations-section"
        data-animate="true"
        style={{
          opacity: visibleElements["collaborations-section"] ? 1 : 0.3,
          transform: visibleElements["collaborations-section"]
            ? "translateY(0)"
            : "translateY(20px)",
          transition:
            "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
        }}
      >
        <div className="relative mb-3 h-px w-full overflow-hidden rounded-full bg-[rgba(255,64,0,0.2)] dark:bg-[rgba(108,235,228,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff4000] to-transparent dark:via-[#6cebe4] animate-[pulse_1.8s_ease-in-out_infinite] shadow-[0_0_8px_rgba(255,64,0,0.7)] dark:shadow-[0_0_10px_rgba(108,235,228,0.9)]" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Collaborations and Other Work
        </h2>
        <ProductGrid
          products={collaborationProducts}
          onOpenGallery={openGallery}
          onOpenGrid={openCooperGrid}
          visibleElements={visibleElements}
        />
      </section>

      <section
        id="stickers-section"
        data-animate="true"
        className="mt-10"
        style={{
          opacity: visibleElements["stickers-section"] ? 1 : 0.3,
          transform: visibleElements["stickers-section"]
            ? "translateY(0)"
            : "translateY(20px)",
          transition:
            "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
        }}
      >
        <div className="relative mb-3 h-px w-full overflow-hidden rounded-full bg-[rgba(255,64,0,0.2)] dark:bg-[rgba(108,235,228,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff4000] to-transparent dark:via-[#6cebe4] animate-[pulse_1.8s_ease-in-out_infinite] shadow-[0_0_8px_rgba(255,64,0,0.7)] dark:shadow-[0_0_10px_rgba(108,235,228,0.9)]" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Stickers</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Coming soon — print-to-order stickers in the works.
        </p>
        <ProductGrid
          products={stickerProducts}
          onOpenGallery={openGallery}
          visibleElements={visibleElements}
        />
      </section>

      <CooperDiersGridModal
        key={cooperGridKey}
        product={cooperGridProduct}
        onClose={closeCooperGrid}
        onOpenGroup={openGroupFromGrid}
      />

      <GalleryLightbox
        isOpen={isGalleryOpen}
        images={activeImages}
        activeIndex={activeImageIndex}
        title={activeProduct?.name || "Store item"}
        viewerAriaLabel={
          activeProduct
            ? `${activeProduct.name} image gallery`
            : "Store image gallery"
        }
        onClose={closeGallery}
        onPrev={prevImage}
        onNext={nextImage}
        onSelectIndex={setActiveImageIndex}
        allowNav={gridGroups.length > 0}
        getImageAlt={(index) =>
          `${activeProduct?.name || "Store item"} preview ${index + 1}`
        }
        fullScreen
        alwaysShowThumbRail
        largeThumbs
        overlayRef={galleryOverlayRef}
        onContentTouchStart={handleLightboxTouchStart}
        onContentTouchEnd={handleLightboxTouchEnd}
      />
    </main>
  );
}
