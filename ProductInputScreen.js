// ProductInputScreen.js

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import AddProductForm from './AddProductForm';
import ProductProfile from './ProductProfile';
import { collection, addDoc, setDoc, db, doc } from './firebase/index';

const ProductInputScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [productList, setProductList] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleAddProduct = async (productName) => {
    const productData = { name: productName, category, expirationDate: 'N/A' };

    // Add a new document to the 'products' collection
    const docRef = await addDoc(collection(db, 'products'), productData);

    // Update the local product list
    setProductList([...productList, { ...productData, id: docRef.id }]);
    setIsAddingProduct(false);
  };

  const handleEditProduct = (productData) => {
    navigation.navigate('EditProduct', {
      productData,
      onSave: (editedProduct) => handleSaveProduct(productData, editedProduct),
    });
  };

  const handleSaveProduct = async (oldProduct, editedProduct) => {
    const productDocRef = doc(db, 'products', oldProduct.id);

    // Update the document in the 'products' collection
    await setDoc(productDocRef, editedProduct);

    // Update the local product list
    const updatedList = productList.map((product) => {
      if (product.id === oldProduct.id) {
        return { ...product, ...editedProduct };
      }
      return product;
    });

    setProductList(updatedList);
  };

  const handleAddButtonPress = () => {
    setIsAddingProduct(true);
  };

  useEffect(() => {
    // Load initial data or set up real-time updates if needed
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      {isAddingProduct ? (
        <AddProductForm onAddProduct={handleAddProduct} />
      ) : (
        <View>
          {productList.map((product) => (
            <ProductProfile key={product.id} productData={product} onEdit={() => handleEditProduct(product)} />
          ))}
          <Button title="Add" onPress={handleAddButtonPress} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProductInputScreen;
