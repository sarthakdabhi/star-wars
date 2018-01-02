class App {
    queans:{q: string, a: string, b: string, ans: string}[] = [];
    quesCount:number = 0;
    points:number = 0;
    soundID:string = "star-wars";
    volEl:any;

    constructor () {
        this.queans = [
            {
                "q": "How many times has R2-D2 been to Dagobah?",
                "a": "A: Three. Once with Yoda during the Clone Wars and twice with Luke.",
                "b": "B: Once with Yoda during the Clone Wars and twice with Luke.",
                "ans": "a"
            },
            {
                "q": "What did Mother Talzin use to create new legs for Maul?",
                "a": "A: Pieces of destroyed battle droids.",
                "b": "B: Pieces of destroyed battle R2-D2.",
                "ans": "a"
            },
            {
                "q": "What Imperial Star Destroyer intercepted Princess Leia’s ship above Tatooine in Star Wars- A New Hope?",
                "a": "A: The Devastator.",
                "b": "B: The DeathStar.",
                "ans": "b"
            },
            {
                "q": "The ancient design of Kylo Ren’s lightsaber dates back to what historical conflict?",
                "a": "A: The Great Scourge of Malachor.",
                "b": "B: The Great Scourge of Dagobah.",
                "ans": "a"
            },
            {
                "q": "What bounty hunter employed a bowcaster as his weapon of choice?",
                "a": "A: Rako Hardeen.",
                "b": "B: Embo.",
                "ans": "b"
            },
            {
                "q": "During the Battle of Jakku, what Super Star Destroyer crashed on the planet?",
                "a": "A: The Deathstar.",
                "b": "B: The Ravager.",
                "ans": "b"
            },
            {
                "q": "Anakin Skywalker piloted a Y-wing into battle against what massive Separatist warship?",
                "a": "A: The Malevolence.",
                "b": "B: The Yavin 4.",
                "ans": "a"
            },
            {
                "q": "Poe Dameron‘s mother gave him his first flight lessons in what type of starfighter?",
                "a": "A: Y-wing.",
                "b": "B: A-wing.",
                "ans": "b"
            },
            {
                "q": "On what planet did Cad Bane capture Bolla Ropal?",
                "a": "A: Dagobah.",
                "b": "B: Devaron.",
                "ans": "b"
            },{
                "q": "What bounty hunter did Obi-Wan impersonate to prevent an assassination?",
                "a": "A: Embo.",
                "b": "B: Rako Hardeen.",
                "ans": "b"
            }
        ];
        $('.screens').hide();
        this.loadSound();
        this.quesCount = 0;
    }

    loadSound ():void {
        const that = this;
        createjs.Sound.alternateExtensions = ["ogg"];
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
        createjs.Sound.on("fileload", function() {
            $('#loading').hide();
            that.screen1();
        }, this);
        createjs.Sound.registerSound("sounds/star-wars.wav", this.soundID);        
    }

    screen1 ():void {
        const that = this;
        $('#screen-1').show();
        setTimeout(function () {
            $('#screen-1').fadeOut(1000, function () {
                $('.screens').hide();
                $('#volume').show();
                var soundProps = new createjs.PlayPropsConfig().set({loop: -1});    
                const audio = createjs.Sound.play(that.soundID, soundProps);
                var volEl = $('#vol')
                                .slider({reversed: true})
                                .on('slide', function(e) {
                                    audio.volume = volEl.getValue()/100;
                                })
                                .data('slider');
                const screen1El = $('#screen-2');
                const logoEl = $('#logo');
                const sloganEl = $('#slogan');
                const storyEl = $('#story');
                screen1El.show();
                setTimeout(function () {
                    sloganEl.animate({
                        'font-size': '1px'
                    }, 5000);
                    logoEl.animate({
                        'width': '1px'
                    }, 5000, function() {
                        storyEl.animate({
                            'bottom': '600px'
                        }, 5000, function() {
                            that.quesCount = 0;
                            $('.screens').hide();
                            const screen2El = $('#screen-3');
                            screen2El.show();
                            $('#points').html(String(that.points) + "/" + String(that.queans.length));
                            $('#answer-a').off('click');
                            $('#answer-a').on('click', function() {
                                that.checkAns('a');
                            });
                            $('#answer-b').off('click');
                            $('#answer-b').on('click', function() {
                                that.checkAns('b');
                            });
                            that.newQuestion();
                        });
                    });
                }, 5000);
            });
        }, 3000);
    }

    newQuestion ():void {
        const that = this;
        if (that.queans.length > 0) {
            $('#question').html(that.queans[that.quesCount].q);
            $('#answer-a').html(that.queans[that.quesCount].a);
            $('#answer-b').html(that.queans[that.quesCount].b);
        }
    }

    checkAns (ans:string):void {
        const that = this;
        if (that.quesCount < that.queans.length && that.queans[that.quesCount].ans === ans) {
            that.points++;
            $('#points').html(String(that.points) + "/" + String(that.queans.length));
        }
        that.quesCount++;
        console.log(that.quesCount);
        if (that.quesCount < that.queans.length) {
            that.newQuestion();
        } else {
            $('.screens').hide();
            const screen4El = $('#screen-4');
            screen4El.show();
            $('#points-4').html(String(that.points) + "/" + String(that.queans.length));

            if (that.points <= 5) {
                $('#remark').html("You are just like everyone on Jakku. No one!");
            } else if (that.points > 5) {
                $('#remark').html("You have the force but you need traning. Find Yoda on Dagobah planet!");
            } else if (that.points > 8) {
                $('#remark').html("You are a skywalker. May the force be with you!");
            } else if (that.points == 10) {
                $('#remark').html("You are a real Jedi, The Greatest Fan of Star Wars!");
            } 

            screen4El.animate({
                'background-size': '100%'
            }, 5000);
        }
    }
}

const app = new App();