const BLANK_ABILITY = {
    ability_name:"",
    experience:0,
    score:0,
    specialty:""
};

const BLANK_VIRTUE = {
};

const BLANK_FLAW = {

};

const BLANK_PERSONALITY_TRAIT = {
    trait:"",
    score:""
};

const BLANK_REPUTATION = {
    reputation:"",
    type:"",
    score:0
};

const BLANK_WEAPON = {
    // Qik + Weap - Enc
    init:0,
    // Dex + Ability + Weap
    atk:0,
    // Qik + Ability + Weap
    dfn:0,
    // Str + Weap
    dam:0,

    load:"",
    range:""
};

const BLANK_RAW_VIS = {
    art:"",
    pawns:0,
    physical_form:""
};

const BLANK_SPELL = {
    name:"",
    form:"",
    technique:"",
    level:0,
    bonus:0,
    range:"",
    duration:"",
    target:"",
    experience:0,
    mastery:"",
    notes:""
};

// An empty character
const BLANK_CHARACTER = {
    // Mage, Companion or Grog
    character_type:"",

    // Clerical Info
    character_name: "",
    player_name: "",
    saga:"",
    setting:"",

    // Covenant (Pull from other list)
    //covenant:"",
    
    // Can calculate birth year
    year:"",
    age:"",

    // There is a default for players, range from -5 to +5 , -3 to +3
    size:"",
    // There is a default for players...
    confidence:"",

    // Both dec and warp have array of effects and a score
    decreptitude:{
        score:0,
        effects:[]
    },
    warping:{
        score:0,
        effects:[]
    },

    // Character Extras
    birth_name:"",
    year_born:"",
    gender:"",
    ethnicity:"",
    place_of_origin:"",
    religion:"",
    title_profession:"",
    height:"",
    weight:"",
    hair:"",
    eyes:"",
    handedness:"",

    // Characteristics
    // Range from -5 to +5 (-3 to +3)
    intelligence:0,
    perception:0,
    strength:0,
    stamina:0,
    presence:0,
    communication:0,
    dexterity:0,
    quickness:0,

    // Virtues & Flaws
    // Array of virtue & flaw objects
    virtures:[],
    flaws:[],

    // Abilities 
    // Ability array contains ability objects with exp, ability, specialty & score
    abilities:[],

    // Personality Traits
    personality_traits:[],

    // Combat
    armour_worn:"",
    soak:0,
    combat_modifier:0,
    armour_load:0,

    // Fatigue Levels
    fatigue_level:"",

    // Wounds
    light_wounds:{
        range:"",
        count:0,
        notes:""
    },
    medium_wounds:{
        range:"",
        count:0,
        notes:""
    },
    heavy_wounds:{
        range:"",
        count:0,
        notes:""
    },
    incompacitated:{
        range:"",
        toggle:false
    },
    dead:{
        range:"",
        toggle:false
    },
    
    //Weapons
    weapons:[],

    // Equipment
    equipment:[],

    /// MAGE
    // Clerical
    house:"",
    covenant:"",
    wizards_sigil:"",
    domus_magna:"",
    primus:"",
    parens:"",
    covenant_as_apprentice:"",

    // Magical Arts
    technique:{
        creo:{
            experience:0,
            score:0
        },
        intellego:{
            experience:0,
            score:0
        },
        muto:{
            experience:0,
            score:0
        },
        perdo:{
            experience:0,
            score:0
        },
        rego:{
            experience:0,
            score:0
        },
        animal:{
            experience:0,
            score:0
        },
        aquam:{
            experience:0,
            score:0
        },
        auram:{
            experience:0,
            score:0
        },
        corpus:{
            experience:0,
            score:0
        },
        herbam:{
            experience:0,
            score:0
        },
        ignem:{
            experience:0,
            score:0
        },
        imaginem:{
            experience:0,
            score:0
        },
        mentem:{
            experience:0,
            score:0
        },
        terram:{
            experience:0,
            score:0
        },
        vis:{
            experience:0,
            score:0
        }
    },

    // Qik + Finesse (+stress die)
    fast_casting_speed:0,  
    // Per + Awareness (+die vs 15-magnitude)
    determining_effect:0,
    // Per + Finesse (+die)
    base_targeting:0,
    // Sta + Concentration (+die)
    concentration:0,
    // Parma * 5 (+form)
    magic_resistance:0,
    // Int + Finesse (+stress die - no. of spells, vs 9)
    multiple_casting:0,

    // LAB
    // Int + Theory + Aura (+Technique+Form)
    basic_lab_total:0,

    // Longevity Ritual
    longevity_ritual:{
        lab_total:0,
        age_roll_modifier:0,
        twilight_scars:[]
    },
    
    raw_vis:[],

    familiar:{
        int_cun:0,
        per:0,
        str:0,
        sta:0,
        pre:0,
        com:0,
        dex:0,
        qik:0,
        size:0,
        might:0,
        soak:0,
        fat:0,
        init:0,
        atk:0,
        dfn:0,
        dam:0,
        bronze_cord:"",
        silver_cord:"",
        gold_cord:"",
        bond_qualities:[]
    },

    spells:[]

};
export default BLANK_CHARACTER;

