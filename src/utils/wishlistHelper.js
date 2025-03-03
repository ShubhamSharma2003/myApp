import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

// ✅ Load Wishlist from AsyncStorage
export const loadWishlist = async () => {
    try {
        const storedWishlist = await AsyncStorage.getItem("wishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
        console.error("Error loading wishlist:", error);
        return [];
    }
};

// ✅ Toggle Wishlist (Add/Remove)
export const toggleWishlist = async (product, wishlist, setWishlist, showToast = true) => {
    try {
        let updatedWishlist = [...wishlist];
        const index = updatedWishlist.findIndex((item) => item.id === product.id);

        if (index === -1) {
            updatedWishlist.push(product);
            if (showToast) {
                Toast.show({
                    type: "success",
                    text1: "Added to Wishlist",
                    text2: product.title + " has been added!",
                });
            }
        } else {
            updatedWishlist = updatedWishlist.filter((item) => item.id !== product.id);
            if (showToast) {
                Toast.show({
                    type: "info",
                    text1: "Removed from Wishlist",
                    text2: product.title + " has been removed!",
                });
            }
        }

        await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist); // Update state in ProductGrid
    } catch (error) {
        console.error("Error updating wishlist:", error);
    }
};


// ✅ Remove from Wishlist
export const removeFromWishlist = async (productId, productTitle, setWishlist) => {
    try {
        let storedWishlist = await AsyncStorage.getItem("wishlist");
        let wishlistArray = storedWishlist ? JSON.parse(storedWishlist) : [];

        wishlistArray = wishlistArray.filter((item) => item.id !== productId);

        await AsyncStorage.setItem("wishlist", JSON.stringify(wishlistArray));
        setWishlist([...wishlistArray]);

        Toast.show({
            type: "info",
            text1: "Removed from Wishlist",
            text2: `${productTitle} has been removed!`,
        });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
    }
};
