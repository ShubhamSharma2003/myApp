import React, { useState } from "react";
import { FlatList, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import styles from '../../styles/mainStyle';

const { width, height } = Dimensions.get('window');

const TopContent = () => {
    return (
        <View style={[styles.row, styles.pd10, styles.bdbt1, styles.mgbt20]}> 
            <View style={[styles.fl1, styles.textCenter]}>
                <Image source={{ uri: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid' }} style={[styles.coim, { width: 65, height: 65 }]} />
            </View>
            <View style={[styles.fl3, styles.textCenter, styles.pdlt10]}>
                <Text style={[styles.f18, styles.b]}>Developer @ NOISE</Text>
                <Text style={[styles.f14, styles.pdtp5]}>dev@gonoise.com</Text>
                <Text style={[styles.f14]}>+91 9911221122</Text>
            </View>

        </View>
    );
};

const Item = ({ title, action }) => (
    <TouchableOpacity onPress={() => action(title.slug)} style={[styles.row, styles.spacedBw, styles.pdtp10, styles.pdbt10, styles.pdlt10, styles.pdrt10, styles.bdbt1, styles.mgbt10]}>
        <Text style={[styles.f18]}>
            <Icon name={title.icon} size={19} /> {title.name}
        </Text>
        <Text>
            <Icon name="chevron-forward" size={18} />
        </Text>
    </TouchableOpacity>
);

export default function Profile(props) {
    const [menu, setMenu] = useState([
        { id: 0, name: 'Orders', slug: 'Orders', icon: 'clipboard-outline' },
        { id: 1, name: 'Help Center', slug: 'HelpCenter', icon: 'help-circle-outline' },
        { id: 2, name: 'Coupons', slug: 'Coupons', icon: 'pricetags-outline' },
        { id: 3, name: 'Payments', slug: 'Payments', icon: 'card-outline' },
        { id: 4, name: 'Manage Account', slug: 'ManageAccount', icon: 'person-outline' },
        { id: 5, name: 'Wishlist', slug: 'Wishlist', icon: 'heart-outline' },
        { id: 6, name: 'Settings', slug: 'Settings', icon: 'settings-outline' },
    ]);

    const [infoSection, setInfoSection] = useState([
        { id: 0, name: 'FAQ', slug: 'FAQ', icon: 'information-circle-outline' },
        { id: 1, name: 'About Us', slug: 'AboutUs', icon: 'people-outline' },
        { id: 2, name: 'Terms & Conditions', slug: 'TermsConditions', icon: 'document-text-outline' },
        { id: 3, name: 'Privacy Policy', slug: 'PrivacyPolicy', icon: 'shield-outline' },
        { id: 4, name: 'Logout', slug: 'Logout', icon: 'log-out-outline' },
    ]);

    const actionHandler = (data) => {
        props.navigation.navigate(data);
    };

    const renderItem = ({ item }) => <Item title={item} action={actionHandler} />;

    return (
        <ScrollView>
            <FlatList
                data={menu}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={<TopContent />}
            />
            <Text style={[styles.f18, styles.b, styles.pdlt10, styles.pdtp10]}>More Information</Text>
            <FlatList
                data={infoSection}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </ScrollView>
    );
}
