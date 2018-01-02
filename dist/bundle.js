(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.queans = [];
        this.quesCount = 0;
        this.points = 0;
        this.soundID = "star-wars";
        this.queans = [{
            "q": "How many times has R2-D2 been to Dagobah?",
            "a": "A: Three. Once with Yoda during the Clone Wars and twice with Luke.",
            "b": "B: Once with Yoda during the Clone Wars and twice with Luke.",
            "ans": "a"
        }, {
            "q": "What did Mother Talzin use to create new legs for Maul?",
            "a": "A: Pieces of destroyed battle droids.",
            "b": "B: Pieces of destroyed battle R2-D2.",
            "ans": "a"
        }, {
            "q": "What Imperial Star Destroyer intercepted Princess Leia’s ship above Tatooine in Star Wars- A New Hope?",
            "a": "A: The Devastator.",
            "b": "B: The DeathStar.",
            "ans": "b"
        }, {
            "q": "The ancient design of Kylo Ren’s lightsaber dates back to what historical conflict?",
            "a": "A: The Great Scourge of Malachor.",
            "b": "B: The Great Scourge of Dagobah.",
            "ans": "a"
        }, {
            "q": "What bounty hunter employed a bowcaster as his weapon of choice?",
            "a": "A: Rako Hardeen.",
            "b": "B: Embo.",
            "ans": "b"
        }, {
            "q": "During the Battle of Jakku, what Super Star Destroyer crashed on the planet?",
            "a": "A: The Deathstar.",
            "b": "B: The Ravager.",
            "ans": "b"
        }, {
            "q": "Anakin Skywalker piloted a Y-wing into battle against what massive Separatist warship?",
            "a": "A: The Malevolence.",
            "b": "B: The Yavin 4.",
            "ans": "a"
        }, {
            "q": "Poe Dameron‘s mother gave him his first flight lessons in what type of starfighter?",
            "a": "A: Y-wing.",
            "b": "B: A-wing.",
            "ans": "b"
        }, {
            "q": "On what planet did Cad Bane capture Bolla Ropal?",
            "a": "A: Dagobah.",
            "b": "B: Devaron.",
            "ans": "b"
        }, {
            "q": "What bounty hunter did Obi-Wan impersonate to prevent an assassination?",
            "a": "A: Embo.",
            "b": "B: Rako Hardeen.",
            "ans": "b"
        }];
        $('.screens').hide();
        this.loadSound();
        this.quesCount = 0;
    }

    _createClass(App, [{
        key: "loadSound",
        value: function loadSound() {
            var that = this;
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
            createjs.Sound.on("fileload", function () {
                $('#loading').hide();
                that.screen1();
            }, this);
            createjs.Sound.registerSound("sounds/star-wars.wav", this.soundID);
        }
    }, {
        key: "screen1",
        value: function screen1() {
            var that = this;
            $('#screen-1').show();
            setTimeout(function () {
                $('#screen-1').fadeOut(1000, function () {
                    $('.screens').hide();
                    $('#volume').show();
                    var soundProps = new createjs.PlayPropsConfig().set({ loop: -1 });
                    var audio = createjs.Sound.play(that.soundID, soundProps);
                    var volEl = $('#vol').slider({ reversed: true }).on('slide', function (e) {
                        audio.volume = volEl.getValue() / 100;
                    }).on('change', function (e) {
                        audio.volume = volEl.getValue() / 100;
                    }).data('slider');
                    var screen1El = $('#screen-2');
                    var logoEl = $('#logo');
                    var sloganEl = $('#slogan');
                    var storyEl = $('#story');
                    screen1El.show();
                    setTimeout(function () {
                        sloganEl.animate({
                            'font-size': '1px'
                        }, 5000);
                        logoEl.animate({
                            'width': '1px'
                        }, 5000, function () {
                            storyEl.animate({
                                'bottom': '600px'
                            }, 5000, function () {
                                that.quesCount = 0;
                                $('.screens').hide();
                                var screen2El = $('#screen-3');
                                screen2El.show();
                                $('#points').html(String(that.points) + "/" + String(that.queans.length));
                                $('#answer-a').off('click');
                                $('#answer-a').on('click', function () {
                                    that.checkAns('a');
                                });
                                $('#answer-b').off('click');
                                $('#answer-b').on('click', function () {
                                    that.checkAns('b');
                                });
                                that.newQuestion();
                            });
                        });
                    }, 5000);
                });
            }, 3000);
        }
    }, {
        key: "newQuestion",
        value: function newQuestion() {
            var that = this;
            if (that.queans.length > 0) {
                $('#question').html(that.queans[that.quesCount].q);
                $('#answer-a').html(that.queans[that.quesCount].a);
                $('#answer-b').html(that.queans[that.quesCount].b);
            }
        }
    }, {
        key: "checkAns",
        value: function checkAns(ans) {
            var that = this;
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
                var screen4El = $('#screen-4');
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
    }]);

    return App;
}();

var app = new App();

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
