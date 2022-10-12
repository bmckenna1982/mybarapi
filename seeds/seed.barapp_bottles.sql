BEGIN;

TRUNCATE 
    public.bottles,
    public.categories, 
    RESTART IDENTITY CASCADE;

INSERT INTO public.categories ( category, sub)
    VALUES (
        'Bourbon',
        'Kentucky'
    ),
    (
        'Bourbon',
        'Small-batch'
    ),
    (
        'Whiskey',
        'Canadian'
    ),
    (
        'Scotch',
        ''
    ),
    (
        'Rye',
        ''
    ),
    (
        'Tequila',
        ''
    ),
    (
        'Vodka',
        ''
    ),
    (
        'Rum',
        ''
    );

INSERT INTO public.bottles ( upc, brand, year, category, size, msrp, bottle_desc, thumbnail, notes  )
    VALUES
        (
            088004021344,
            'Eagle Rare',
            10,
            1,
            '750ml',
            '4000',
            'Aged for a minimum of ten years, this Kentucky straight bourbon was named the Best Bourbon at the 2013 International Wine and Spirits Competition and won a Gold Medal at the World Whisky Masters in 2017.Eagle Rare Kentucky Straight Bourbon Whiskey is.',
            'https://cdn11.bigcommerce.com/s-7a906/images/stencil/1280x1280/products/1279/8691/Eagle_Rare_10__14110.1433435060.jpg?c=2&imbypass=on',
            'The nose is complex, with aromas of toffee, hints of orange peel, herbs, honey, leather and oak. The taste is bold, dry and delicate with notes of candied almonds and very rich cocoa. The finish is dry and lingering.'
        ),
        (
            096749472215,
            'Elijah Craig Small Batch Barrel Proof',
            NULL,
            2,
            '750ml',
            '4000',
            'Made in the same tradition as other award-winning Elijah Craig Bourbons, this bottle is an essential experience for lovers of great-tasting Bourbon. Uncut, straight from the barrel without chill filtering, the nose, taste, and finish created by twelve years of aging are preserved in their simplest form. At full Barrel Proof, you can enjoy Elijah Craig much the same way our Master Distillers do when they sample straight from the barrel in our Kentucky rickhouses. Or, add water to reduce the proof to exactly where you want it.',
            'https://cdn11.bigcommerce.com/s-7a906/images/stencil/1280x1280/products/6851/13970/Elijah-Craig-Barrel-Proof__60056.1587069108.jpg?c=2&imbypass=on',
            'Nose: Caramel with toasted oak, fruit notes of apple and orange, Taste: Rich vanilla, caramel, and butterscotch along with spices of black pepper & cinnamon at the back of the palate, Finish: Nicely layered showcasing all flavors, fades slowly then lingers as it cools'
        ),
        (
            088004025748,
            'W.L. Weller Special Reserve',
            NULL,
            1,
            '750ml',
            '20000',
            'The Original Wheated Bourbon Whiskey features an exceptionally smooth taste, substituting wheat for rye grain. Bottled at 90 proof, this bourbon stands out with its burnt orange color. Its softer flavor notes make this bourbon great for sipping or making cocktails.',
            'https://cdn11.bigcommerce.com/s-qtoc3aerdw/images/stencil/2048x2048/products/1023/8233/Weller-Bourbon-Special-Reserve-750ml__84690.1605290909.jpg?c=2',
            'A sweet nose with a presence of caramel. Tasting notes of honey, butterscotch, and a soft woodiness. It''s smooth, delicate and calm. Features a smooth finish with a sweet honeysuckle flair.'
        );

COMMIT;