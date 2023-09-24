import { Component } from '@angular/core';
import { BotService } from '../services/bot.service';
import { FormArrayName, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  constructor(private openAiApiService: BotService ,
    private formBuilder:FormBuilder){}

  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];
  showChatbot: boolean = false;
  isSearchStarted :boolean = false;
  isAnswered : boolean = false;
  chatForm = this.formBuilder.group({
    message:[''],
    reply:['']
  });

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }

  sendMessage() {
    this.isSearchStarted = true;
    const userMessage = this.chatForm.value.message || "";
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.openAiApiService.sendMessage(userMessage)
      .subscribe(response => {
        this.assistantReply = response.reply;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
        this.isSearchStarted = false;
        this.chatForm.patchValue({
          reply : this.assistantReply
        })
        this.isAnswered = true;
      });
  }

  reset(){
    this.isAnswered=false;
    this.chatForm.reset()
  }
}