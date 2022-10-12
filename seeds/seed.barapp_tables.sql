BEGIN;

TRUNCATE
    public.inventory,        
    public.users
    RESTART IDENTITY CASCADE;

INSERT INTO public.users ( user_name, first_name, last_name, email, password, membership )
    VALUES (
        'TheMaster',
        'Matthew',
        'Buckles',
        'master@email.com',
        'Test1234!',
        'premium'
    ),
    (
        'TheAdmin',
        'Brian',
        'McKenna',
        'admin@email.com',
        'Test1234!',
        'premium'
    );

    INSERT INTO public.inventory (bottle_id, user_id, rating, paid, purchase_loc, demand, year_bottled, qty)
        VALUES
            (
                088004021344,
                1,
                6,
                35000,
                'Jax',
                5,
                null,
                1
            ),
            (
                096749472215,
                1,
                5,
                42000,
                'Jax',
                4,
                null,
                2
            ),
            (
                088004021344,
                2,
                8,
                36000,
                'Westside Beverage',
                7,
                null,
                4
            );


COMMIT;