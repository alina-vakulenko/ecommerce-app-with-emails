interface CartItemImageProps {
  src: string;
  alt: string;
}

const CartItemImage = ({ src, alt }: CartItemImageProps) => {
  return (
    <div className="w-16 h-16">
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
};

export default CartItemImage;
