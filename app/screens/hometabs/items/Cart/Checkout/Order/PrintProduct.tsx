import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';

const PrintProduct = ({ route, navigation }: { route: any; navigation: any }) => {
  const order = route?.params?.order || {};

  const receiptRef = useRef<ViewShot>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const DashedLine = () => (
    <View style={styles.dashedLine}>
      {[...Array(50)].map((_, i) => (
        <View key={i} style={styles.dash} />
      ))}
    </View>
  );

  const handleScreenshot = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền truy cập bị từ chối', 'Vui lòng cấp quyền truy cập thư viện ảnh để lưu ảnh chụp màn hình.');
        return;
      }

      if (receiptRef.current) {
        const uri = await receiptRef.current.capture();
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.getAlbumAsync('Hóa đơn');
        if (album === null) {
          await MediaLibrary.createAlbumAsync('Hóa đơn', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }

        setCapturedImage(uri);

        Alert.alert(
          'Thành công',
          'Hóa đơn đã được lưu vào thư viện ảnh.',
          [
            { text: 'OK' },
            { 
              text: 'Xem ảnh', 
              onPress: () => setIsModalVisible(true)
            },
          ]
        );
      } else {
        console.error('ReceiptRef is null');
      }
    } catch (error) {
      console.error('Lỗi khi chụp màn hình:', error);
      Alert.alert('Lỗi', 'Không thể chụp và lưu màn hình. Vui lòng thử lại sau.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>HÓA ĐƠN BÁN HÀNG</Text>
        <TouchableOpacity onPress={handleScreenshot} style={styles.saveButton}>
          <Ionicons name="camera-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        <ViewShot ref={receiptRef} options={{ format: "png", quality: 0.9 }}>
          <View style={styles.receipt}>
            <View style={styles.orderInfo}>
              <Text style={styles.label}>Mã đơn hàng:</Text>
              <Text style={styles.value}>{order.order_code}</Text>
            </View>
            
            <View style={styles.orderInfo}>
              <Text style={styles.label}>Ngày:</Text>
              <Text style={styles.value}>{formatDate(order.order_date)}</Text>
            </View>
            
            <DashedLine />
            
            <View style={styles.tableHeader}>
              <Text style={[styles.columnHeader, { flex: 2 }]}>Sản phẩm</Text>
              <Text style={[styles.columnHeader, { flex: 0.5 }]}>SL</Text>
              <Text style={[styles.columnHeader, { flex: 1.5 }]}>Đơn giá</Text>
              <Text style={[styles.columnHeader, { flex: 1.5 }]}>Thành tiền</Text>
            </View>
            
            {order.order_items && order.order_items.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.itemName, { flex: 2 }]}>{item.product_name}</Text>
                <Text style={[styles.itemQuantity, { flex: 0.5 }]}>x {item.quantity}</Text>
                <Text style={[styles.itemPrice, { flex: 1.5 }]}>{item.price.toLocaleString('vi-VN')}đ</Text>
                <Text style={[styles.itemTotal, { flex: 1.5 }]}>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</Text>
              </View>
            ))}
            
            <DashedLine />
            
            <View style={styles.total}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalValue}>{order.total_amount?.toLocaleString('vi-VN')}đ</Text>
            </View>
            
            <Text style={styles.status}>Trạng thái: {order.status}</Text>
            
            <DashedLine />
            
            <Text style={styles.footer}>Cảm ơn quý khách đã mua hàng!</Text>
          </View>
        </ViewShot>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {capturedImage && (
              <Image
                source={{ uri: capturedImage }}
                style={styles.capturedImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  saveButton: {
    padding: 10,
  },
  receipt: {
    padding: 20,
    backgroundColor: '#fff',
  },
  orderInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    width: 100,
  },
  value: {
    flex: 1,
  },
  dashedLine: {
    flexDirection: 'row',
    height: 1,
    marginVertical: 10,
  },
  dash: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  itemName: {
    textAlign: 'left',
  },
  itemQuantity: {
    textAlign: 'center',
  },
  itemPrice: {
    textAlign: 'right',
  },
  itemTotal: {
    textAlign: 'right',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalValue: {
    fontWeight: 'bold',
  },
  status: {
    marginTop: 20,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  capturedImage: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PrintProduct;
