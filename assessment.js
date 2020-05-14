'use strict';
const userNameInput = document.getElementById('user-name'); //こっから↓(5行目まで)HTMLに設定したID使って要素取得してる
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {               //指定したすべての子供を消す
    while(element.firstChild){                      //trueの時実行される抑制文(removeChildは指定した子要素を削除する関数)
        //子供の要素があるかぎり削除
        element.removeChild(element.firstChild);    //要素の最初の子供がいる限り
    }
}

assessmentButton.onclick = () => {                  //ボタン押された時呼び出される処理(アロー関数)
    const userName = userNameInput.value;           //テキスト入力の値を受け取る処理
    if (userName.length === 0) {                    //文字列の長さが0だった場合は処理を終了する(これnullじゃダメなん？)
        //名前が空の時は処理を終了する
        console.log('名前入力されてない'); 
        return;
    }
    console.log(userName);                          //コンソール表示

    //診断結果表示エリア
    removeAllChildren(resultDivided);               //removeAllChildren引っ張ってきて子供全部消す
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);              //子を追加する

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成場所
    removeAllChildren(tweetDivided);               //removeAllChildren引っ張ってきて子供全部消す

};
const answers = [                                  //診断結果のパターン
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);///\{userName\}/g←これ正規表現(文字列自身に合うものを複数回適応する)
    return result;
}

//テストコード
console.assert(                                        //console.assertは第一引数にtrueになるテスト式を入れて、第二引数にテストが正しくなかった時のメッセを書き込む
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)
console.assert(
    assessment('太郎') === assessment('太郎'),         //入力が同じだから＝で同じ内容繋いじゃう
    '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。'
)
