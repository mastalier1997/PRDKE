import { Component, OnInit } from '@angular/core';
import {PostServiceService} from './post-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-post-service',
  templateUrl: './post-service.component.html',
  providers: [PostServiceService],
  styleUrls: ['./post-service.component.css']
})
export class PostServiceComponent implements OnInit {

  constructor(private postService: PostServiceService, private  fb: FormBuilder) {this.createForm(); }
  angForm: FormGroup;

  emojis = [
      {
        displayValue: '😀',
        value: 'happy'
      },
      {
        displayValue: '😊',
        value: 'blushed'
      },
      {
        displayValue: '😁',
        value: 'grinning'
      },
      {
        displayValue: '😅',
        value: 'confused'
      },
      {
        displayValue: '😃',
        value: 'happy3'
      },
      {
        displayValue: '😄',
        value: 'happy4'
      },
      {
        displayValue: '😆',
          value: 'happy5'
      },
      {
        displayValue: '😷',
        value: 'sick'
      },
      {
        displayValue: '😲',
        value: 'astonished'
      },
      {
        displayValue: '😰',
        value: 'cold'
      },
      {
        displayValue: '😭',
        value: 'cry'
      },
      {
        displayValue: '😈',
        value: 'devil'
      },
      {
        displayValue: '😑',
        value: 'expressionless'
      },
      {
        displayValue: '🙄',
        value: 'eyeRoll'
      },
      {
        displayValue: '😦',
        value: 'frowning'
      }, {
        displayValue: '😲',
        value: 'flushed'
      }, {
        displayValue: '👻',
        value: 'ghost'
      }, {
        displayValue: '🙃',
        value: 'happy-upside'
      }, {
        displayValue: '🤗',
        value: 'hugging'
      }, {
        displayValue: '😯',
        value: 'hushed'
      }, {
        displayValue: '😂',
        value: 'joy'
      }, {
        displayValue: '😘',
        value: 'kissing'
      }, {
        displayValue: '🤑',
        value: 'money'
      }, {
        displayValue: '🤓',
        value: 'nerd'
      }, {
        displayValue: '😱',
        value: 'omg'
      },
      {
        displayValue: '😌',
        value: 'relieved'
      }, {
        displayValue: '😞',
        value: 'sad'
      }, {
        displayValue: '😏',
        value: 'smrik'
      }, {
        displayValue: '💩',
        value: 'poop'
      }, {
        displayValue: '😎',
        value: 'sunglasses'
      }, {
        displayValue: '🤔',
        value: 'thinking'
      }, {
        displayValue: '😛',
        value: 'tongue-out'
      }, {
        displayValue: '😝',
        value: 'tongue-out2'
      }, {
      displayValue: '😜',
      value: 'tongue-out3'
      }, {
      displayValue: '😒',
      value: 'unamused'
      },  {
        displayValue: '😡',
        value: 'vangry'
      }, {
        displayValue: '😤',
        value: 'vmad'
      }, {
        displayValue: '🙁',
        value: 'vasd'
      }, {
        displayValue: '😉',
        value: 'wink'
      }, {
        displayValue: '😶',
        value: 'without'
      }, {
        displayValue: '🤐',
        value: 'zipper'
      }
  ];

  ngOnInit(): void {
  }


  createForm() {
    this.angForm = this.fb.group({
      emoji: ['', Validators.required],
      postText: ['', Validators.required]
    });
  }

  postMood(): void {
    const emoji = this.angForm.get('emoji').value;
    const text = this.angForm.get('postText').value;
    this.postService.postUserMoods(emoji, text);
    // Call to reset the form values
    this.angForm.get('postText').reset();

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    /*
    (async () => {
      await delay(300);
      location.reload();
    })();*/
  }

  addEmoji($event) {
    const data = this.angForm.get('inputField');
    data.patchValue(data.value + $event.emoji.native);
  }
}
