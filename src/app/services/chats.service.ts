import { Chat } from './../models/chat.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private afs: AngularFirestore) { }

  getChats() {
    return this.afs.collection('Chats', ref => ref.orderBy('created_at','desc')).valueChanges();
  }

  addChat(chat: Chat) {
    return this.afs.collection('Chats').add(chat);
  }
}
