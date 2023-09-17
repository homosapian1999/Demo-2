import fs from "fs/promises";
import Link from "next/link";
import path from "path";

const HomePage = (props) => {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  // cwd => current work directory and it takes the root path;
  //await in readFile gives a promise and it is possible due to fs/promises;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
export default HomePage;
