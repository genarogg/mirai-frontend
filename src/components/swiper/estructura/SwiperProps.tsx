interface SwiperProps {
    children: React.ReactNode;
    effect?:
    "random" |
    "dots" |
    "flyeye" |
    "morph-x" |
    "morph-y" |
    "page-curl" |
    "peel-x" |
    "peel-y" |
    "polygons-fall" |
    "polygons-morph" |
    "polygons-wind" |
    "pixelize" |
    "ripple" |
    "shutters" |
    "slices" |
    "squares" |
    "stretch" |
    "wave-x" |
    "wind";
    autoplay?: any;
    height?: string;
    width?: string;
    slidesPerView?: number;
    spaceBetween?: number;
}

export default SwiperProps;