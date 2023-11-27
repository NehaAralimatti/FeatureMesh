// signalrService.js

import { HubConnectionBuilder } from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5147/progressHub') // Replace with your SignalR hub URL
      .withAutomaticReconnect()
      .build();

    this.startConnection();
  }

  startConnection = async () => {
    try {
      await this.connection.start();
      console.log('SignalR Connected!');
    } catch (error) {
      console.error('Error starting SignalR connection:', error);
    }
  };

  // Add more methods as needed, e.g., to send messages, receive updates, etc.
}

const signalRService = new SignalRService();
export default signalRService;