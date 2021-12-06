import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

type genreAttr = "Femenino" | "Masculino";

type ProductAttr = {
  id: string;
  name: string;
  description: string;
  price: number;
  createdDate: Date;
  imageUrl: string;
  active: boolean;
  genre: genreAttr;
};

const productsCollectionRef = collection(db, "products");

/*
 * const converter = {
 *   toFirestore: (data: ProductAttr) => data,
 *   fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ProductAttr,
 * };
 */

const getAllProducts = async (): Promise<Array<ProductAttr>> => {
  const data = await getDocs(productsCollectionRef);

  const response = data.docs.map(
    (doc) =>
      <ProductAttr>{
        id: doc.id,
        ...(doc.data() as Omit<ProductAttr, "id">),
      }
  );

  return response;
};

const createProduct = async (
  product: Omit<ProductAttr, "id" | "createdDate" | "active">
): Promise<void> => {
  await addDoc(productsCollectionRef, {
    name: product.name,
    description: product.description,
    price: product.price,
    createdDate: new Date(),
    active: true,
    genre: product.genre,
    imageUrl: product.imageUrl,
  });
};

const getProductsByGender = async (
  gender: "Masculino" | "Femenino"
): Promise<Array<ProductAttr>> => {
  const queryResult = query(
    productsCollectionRef,
    where("genre", "==", gender),
    orderBy("createdDate", "desc")
  );

  const result = await getDocs(queryResult).then((response) => {
    const data = response.docs.map(
      (doc) =>
        <ProductAttr>{
          id: doc.id,
          ...(doc.data() as Omit<ProductAttr, "id">),
        }
    );

    return data;
  });

  return result;
};

const getProductById = async (id: string): Promise<ProductAttr> => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return <ProductAttr>{ id: docSnap.id, ...docSnap.data() };
  }

  return <ProductAttr>{ id: docSnap.id };
};

export { createProduct, getAllProducts, getProductById, getProductsByGender };
export type { genreAttr, ProductAttr };
