const vscode = require('vscode');
const errorMessages = {
    unactiveEditor: 'Please select an active editor to insert text'
}
const plays = [{
        name: "MerchantOfVenice",
        text: `To bait fish withal. If it will feed nothing
else, it will feed my revenge. He hath disgraced me
and hind‟red me half a million, laughed at my losses,
mocked at my gains, scorned my nation, thwarted my
bargains, cooled my friends, heated mine enemies –
and what‟s his reason? I am a Jew. Hath not a Jew
eyes? Hath not a Jew hands, organs, dimensions,
sense, affections, passions? – fed with the same
food, hurt with the same weapons, subject to the
same diseases, healed by the same means, warmed
and cooled by the same winter and summer as a
Christian is? If you prick us, do we not bleed? If
you tickle us, do we not laugh? If you poison us, do
we not die? And if you wrong us, shall we not
revenge? If we are like you in the rest, we will
resemble you in that. If a Jew wrong a Christian, what
is his humility? Revenge. If a Christian wrong a
Jew, what should his sufferance be by Christian
example? Why revenge! The villainy you teach me I
will execute, and it shall go hard but I will better
the instruction.`
    },
    {
        name: "Macbeth",
        text: `If it were done, when ’tis done, then ’twere well
It were done quickly: if the assassination
Could trammel up the consequence, and catch
With his surcease success; that but this blow
Might be the be-all and the end-all – here,
But here, upon this bank and shoal of time,
We’d jump the life to come. But in these cases
We still have judgment here; that we but teach
Bloody instructions, which, being taught, return
To plague the inventor: this even-handed justice
Commends the ingredients of our poison’d chalice
To our own lips. He’s here in double trust:
First, as I am his kinsman and his subject,
Strong both against the deed; then, as his host,
Who should against his murderer shut the door,
Not bear the knife myself. Besides, this Duncan
Hath borne his faculties so meek, hath been
So clear in his great office, that his virtues
Will plead like angels, trumpet-tongu’d, against
The deep damnation of his taking-off;
And pity, like a naked new-born babe,
Striding the blast, or heaven’s Cherubins, hors’d
Upon the sightless couriers of the air,
Shall blow the horrid deed in every eye,
That tears shall drown the wind. I have no spur
To prick the sides of my intent, but only
Vaulting ambition, which o’erleaps itself
And falls on the other.`
    },
    {
        name: "JuliusCaesar",
        text: `It must be by his death: and for my part,
I know no personal cause to spurn at him,
But for the general. He would be crown'd:
How that might change his nature, there's the question.
It is the bright day that brings forth the adder;
And that craves wary walking. Crown him?—that;—
And then, I grant, we put a sting in him,
That at his will he may do danger with.
The abuse of greatness is, when it disjoins
Remorse from power: and, to speak truth of Caesar,
I have not known when his affections sway'd
More than his reason. But 'tis a common proof,
That lowliness is young ambition's ladder,
Whereto the climber-upward turns his face;
But when he once attains the upmost round.
He then unto the ladder turns his back,
Looks in the clouds, scorning the base degrees
By which he did ascend. So Caesar may.
Then, lest he may, prevent. And, since the quarrel
Will bear no colour for the thing he is,
Fashion it thus; that what he is, augmented,
Would run to these and these extremities:
And therefore think him as a serpent's egg
Which, hatch'd, would, as his kind, grow mischievous,
And kill him in the shell.`
    },
    {
        name: "Hamlet",
        text: `O all you host of heaven, O earth – what else?
And shall I couple hell? O fie! Hold, hold, my heart,
And you, my sinews, grow not instant old
But bear me swiftly up. Remember thee?
Ay, thou poor ghost, whiles memory holds a seat
In this distracted globe. Remember thee?
Yea, from the table of my memory
I’ll wipe away all trivial fond records,
All saws of books, all forms, all pressures past
That youth and observation copied there,
And thy commandment all alone shall live
Within the book and volume of my brain
Unmixed with baser matter. Yes, by heaven!
O most pernicious woman,
O villain, villain, smiling damned villain!
My tables — meet it is I set it down
That one may smile and smile and be a villain –
At least I am sure it may be so in Denmark.
So, uncle, there you are. Now to my word.
It is ‘Adieu, adieu, remember me.’
I have sworn’t.
`
    },
    {
        name: "KingLear",
        text: `Thou, Nature, art my goddess; to thy law
My services are bound. Wherefore should I
Stand in the plague of custom, and permit
The curiosity of nations to deprive me,
For that I am some twelve or fourteen moonshines
Lag of a brother? Why bastard? wherefore base?
When my dimensions are as well compact,
My mind as generous, and my shape as true,
As honest madam's issue? Why brand they us
With base? with baseness? bastardy? base, base?
Who, in the lusty stealth of nature, take
More composition and fierce quality
Than doth, within a dull, stale, tired bed,
Go to th' creating a whole tribe of fops
Got 'tween asleep and wake? Well then,
Legitimate Edgar, I must have your land.
Our father's love is to the bastard Edmund
As to th' legitimate. Fine word- 'legitimate'!
Well, my legitimate, if this letter speed,
And my invention thrive, Edmund the base
Shall top th' legitimate. I grow; I prosper.
Now, gods, stand up for bastards!`
    },
    {
        name: "Othello",
        text: `It is the cause, it is the cause, my soul,—
Let me not name it to you, you chaste stars!—
It is the cause. Yet I'll not shed her blood;
Nor scar that whiter skin of hers than snow,
And smooth as monumental alabaster.
Yet she must die, else she'll betray more men.
Put out the light, and then put out the light:
If I quench thee, thou flaming minister,
I can again thy former light restore,
Should I repent me: but once put out thy light,
Thou cunning'st pattern of excelling nature,
I know not where is that Promethean heat
That can thy light relume. When I have pluck'd the rose,
I cannot give it vital growth again.
It must needs wither: I'll smell it on the tree.
[Kissing her]
Ah balmy breath, that dost almost persuade
Justice to break her sword! One more, one more.
Be thus when thou art dead, and I will kill thee,
And love thee after. One more, and this the last:
So sweet was ne'er so fatal. I must weep,
But they are cruel tears: this sorrow's heavenly;
It strikes where it doth love. She wakes.`
    },
    {
        name: "ComedyOfErrors",
        text: `And thereof came it that the man was mad:
The venom clamours of a jealous woman
Poison more deadly than a mad dog's tooth.
It seems, his sleeps were hinder'd by thy railing,
And thereof comes it that his head is light.
Thou say'st his meat was sauc'd with thy up-braidings:
Unquiet meals make ill digestions;
Thereof the raging fire of fever bred:
And what's a fever but a fit of madness?
Thou say'st his sports were hinder'd by thy brawls:
Sweet recreation barr'd, what doth ensue
But moody moping, and dull melancholy,
Kinsman to grim and comfortless despair,
And at her heels a huge infectious troop
Of pale distemperatures and foes to life?
In food, in sport, and life-preserving rest
To be disturb'd, would mad or man or beast:
The consequence is then, thy jealous fits
Have scar'd thy husband from the use of wits.`
    },
    {
        name: "Tempest",
        text: `Ye elves of hills, brooks, standing lakes and groves,
And ye that on the sands with printless foot
Do chase the ebbing Neptune and do fly him
When he comes back; you demi-puppets that
By moonshine do the green sour ringlets make,
Whereof the ewe not bites, and you whose pastime
Is to make midnight mushrooms, that rejoice
To hear the solemn curfew; by whose aid,
Weak masters though ye be, I have bedimm'd
The noontide sun, call'd forth the mutinous winds,
And 'twixt the green sea and the azured vault
Set roaring war: to the dread rattling thunder
Have I given fire and rifted Jove's stout oak
With his own bolt; the strong-based promontory
Have I made shake and by the spurs pluck'd up
The pine and cedar: graves at my command
Have waked their sleepers, oped, and let 'em forth
By my so potent art. But this rough magic
I here abjure, and, when I have required
Some heavenly music, which even now I do,
To work mine end upon their senses that
This airy charm is for, I'll break my staff,
Bury it certain fathoms in the earth,
And deeper than did ever plummet sound
I'll drown my book.`
    }
]

function activate(context) {
    let generateCommand = vscode.commands.registerCommand('loremipsum.generateContent', function() {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const position = activeEditor.selection.active;
            const randomShakespeareanText = plays[Math.floor(Math.random() * plays.length)];
            const snippet = new vscode.SnippetString(" " + randomShakespeareanText.text + " ");
            activeEditor.insertSnippet(snippet, position);
        } else
            vscode.window.showErrorMessage(errorMessages.unactiveEditor);
    });
    context.subscriptions.push(generateCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}