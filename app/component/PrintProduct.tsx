import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const PrintProduct = ({ route, navigation }: { route: any; navigation: any }) => {
  const order = route?.params?.order || {
    id: '',
    date: '',
    total: '',
    status: '',
    items: []
  };

  const DashedLine = () => (
    <View style={styles.dashedLine}>
      {[...Array(50)].map((_, i) => (
        <View key={i} style={styles.dash} />
      ))}
    </View>
  );

  const handleDownload = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      // Tạo nội dung cho file hóa đơn
      const invoiceContent = `
=======================================================
                 HÓA ĐƠN BÁN HÀNG
=======================================================

Mã đơn hàng: ${order.id}
Ngày: ${order.date}

-------------------------------------------------------
Sản phẩm         SL       Đơn giá     Thành tiền
-------------------------------------------------------

${order.items.map((item: any) => 
  `${item.name.padEnd(15)} ${item.quantity.toString().padStart(2)}     ${item.price.padStart(9)}đ ${(parseInt(item.price.replace(',', '')) * item.quantity).toString().padStart(11)}đ`
).join('\n')}
-------------------------------------------------------

Tổng cộng:              ${order.total.padStart(23)}đ

Trạng thái: ${order.status}

=======================================================
             Cảm ơn quý khách đã mua hàng!
=======================================================


      `;

      // Tạo tên file dựa trên ngày hiện tại
      const fileName = `hoadon_${currentDate}.txt`;

      // Đường dẫn đến file trong bộ nhớ tạm của ứng dụng
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      // Ghi nội dung vào file
      await FileSystem.writeAsStringAsync(filePath, invoiceContent);

      // Kiểm tra xem thiết bị có hỗ trợ chia sẻ không
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Chia sẻ không khả dụng", "Thiết bị của bạn không hỗ trợ chia sẻ file.");
        return;
      }

      // Chia sẻ file
      await Sharing.shareAsync(filePath, { dialogTitle: 'Tải xuống hóa đơn' });

      Alert.alert('Thất bại', 'Hóa đơn đã được tạo. Vui lòng chọn nơi lưu trữ.');

    } catch (error) {
      console.error('Lỗi khi tạo hóa đơn:', error);
      Alert.alert('Lỗi', 'Không thể tạo hóa đơn. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>HÓA ĐƠN BÁN HÀNG</Text>
        <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
          <Ionicons name="download-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.orderInfo}>
        <Text style={styles.label}>Mã đơn hàng:</Text>
        <Text style={styles.value}>{order.id}</Text>
      </View>
      
      <View style={styles.orderInfo}>
        <Text style={styles.label}>Ngày:</Text>
        <Text style={styles.value}>{order.date}</Text>
      </View>
      
      <DashedLine />
      
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Sản phẩm</Text>
        <Text style={styles.columnHeader}>SL</Text>
        <Text style={styles.columnHeader}>Đơn giá</Text>
        <Text style={styles.columnHeader}>Thành tiền</Text>
      </View>
      
      {order.items.map((item: any, index: number) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <Text style={styles.itemPrice}>{item.price}đ</Text>
          <Text style={styles.itemTotal}>{parseInt(item.price.replace(',', '')) * item.quantity}đ</Text>
        </View>
      ))}
      
      <DashedLine />
      
      <View style={styles.total}>
        <Text style={styles.totalLabel}>Tổng cộng:</Text>
        <Text style={styles.totalValue}>{order.total}đ</Text>
      </View>
      
      <Text style={styles.status}>Trạng thái: {order.status}</Text>
      
      <DashedLine />
      
      <Text style={styles.footer}>Cảm ơn quý khách đã mua hàng!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  downloadButton: {
    padding: 10,
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
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  itemName: {
    flex: 2,
  },
  itemQuantity: {
    flex: 1,
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
  },
  itemTotal: {
    flex: 1,
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
});

export default PrintProduct;
