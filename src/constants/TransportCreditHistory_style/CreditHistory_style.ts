import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262E93',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  currentCreditsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#565EB3',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  currentCreditsInfo: {
    marginLeft: 15,
  },
  currentCreditsLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  currentCreditsAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  emptySubtext: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 5,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#565EB3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  transactionReason: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 2,
  },
  transactionOrderId: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;