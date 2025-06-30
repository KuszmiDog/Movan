import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#262E93',
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#565EB3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  userdetails:{
    alignItems: 'center',
    bottom: 150
  },
  header:{
    height: 90,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileSection: {
    alignItems: 'center',
    padding: moderateScale(20),
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    borderColor: '#262E93',
    borderWidth: 3,
  },
  placeholder: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#262E93',
    borderRadius: moderateScale(15),
    width: moderateScale(30),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  userName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: moderateScale(20),
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '45%',
  },
  statNumber: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  infoSection: {
    padding: moderateScale(20),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  infoText: {
    color: 'white',
    marginLeft: moderateScale(10),
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#262E93',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    margin: moderateScale(20),
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: moderateScale(10),
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    margin: moderateScale(20),
    marginTop: 0,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: moderateScale(10),
  },
  textabove:{
    fontSize: 20,
    color: 'white',
    padding: 30,
    top: 20
  },
  text:{
    fontSize: 20,
    marginBottom: 20,
    color: 'white'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold'
  }

});

export default styles;