import { CartState } from "@/redux/cartSlice";
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OrderConfirmedEmail {
  cart: CartState;
  totalPrice: number;
}

export const OrderConfirmedEmail = ({
  cart,
  totalPrice,
}: OrderConfirmedEmail) => (
  <Html>
    <Head />
    <Preview>FakeStore: Your order</Preview>

    <Body style={main}>
      <Container style={container}>
        <Section style={productTitleTable}>
          <Text style={productTitle}>Your order</Text>
        </Section>

        {Object.keys(cart).map((itemId) => (
          <Section
            key={cart[Number(itemId)].id}
            style={{ marginBottom: "20px" }}
          >
            <Column style={{ paddingLeft: "22px" }}>
              <Text style={productTitle}>{cart[Number(itemId)].title}</Text>
              <Text style={productDescription}>
                {cart[Number(itemId)].description}
              </Text>
            </Column>

            <Column style={productPriceWrapper} align="right">
              <Text style={productPrice}>${cart[Number(itemId)].price}</Text>
            </Column>
            <Column style={productPriceWrapper} align="right">
              <Text style={productPrice}>
                {cart[Number(itemId)].quantity} psc
              </Text>
            </Column>
          </Section>
        ))}

        <Hr style={productPriceLine} />

        <Section align="right">
          <Column style={tableCell} align="right">
            <Text style={productPriceTotal}>TOTAL</Text>
          </Column>
          <Column style={productPriceVerticalLine}></Column>
          <Column style={productPriceLargeWrapper}>
            <Text style={productPriceLarge}>${totalPrice}</Text>
          </Column>
        </Section>

        <Hr style={productPriceLineBottom} />
      </Container>
    </Body>
  </Html>
);

export default OrderConfirmedEmail;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
};

const tableCell = { display: "table-cell" };

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };
