INSERT INTO user (id, username, password, name)
VALUES (1, 'mjordan@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Michael Jordan'),
       (2, 'mjackson@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Michael Jackson'),
       (3, 'mscott@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'Michael Scott'),
       (4, 'asab@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'Arvydas Sabonis'),
       (5, 'tsab@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Tautvydas Sabonis'),
       (6, 'dsab@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Domantas Sabonis'),
       (7, 'am@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Arvydas Macijauskas'),
       (8, 'manp@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Mantas Petruškevičius'),
       (9, 'god@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Goda Sabutytė-Alijeva'),
       (10, 'kar@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'Karina Krysko'),
       (11, 'lk@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'Linas Karalius'),
       (12, 'id@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Ingeborga Dapkūnaitė'),
       (13, 'ival@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Inga Valinskienė'),
       (14, 'aval@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Arūnas Valinskas'),
       (15, 'sjas@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Šarūnas Jasikevičius'),
       (16, 'smar@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Šarūnas Marčiulionis'),
       (17, 'manjan@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Mantas Jankavičius'),
       (18, 'jusjan@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Justinas Jankevičius'),
       (19, 'vikcmi@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Viktorija Čmilytė Nielsen'),
       (20, 'ros@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'Rosita Čivilytė'),
       (21, 'isim@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Ingrida Šimonytė'),
       (22, 'aa@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Aušrinė Armonaitė'),
       (23, 'ks@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm',
        'Kasabas Sabutsabersab'),
       (24, 'ss@gmail.com', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'Sabina Sabinienė'),
       (25, 'user', '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'Šarūnas Verbus');

INSERT INTO role (id, role_name)
VALUES (1, 'USER'),
       (2, 'ADMIN');

INSERT INTO user_role (user_id, role_id)
VALUES (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 1),
       (7, 1),
       (8, 1),
       (9, 1),
       (10, 1),
       (11, 1),
       (12, 1),
       (13, 1),
       (14, 1),
       (15, 1),
       (16, 1),
       (17, 1),
       (18, 1),
       (19, 1),
       (20, 1),
       (21, 1),
       (22, 1),
       (23, 1),
       (24, 1),
       (25, 1),
       (25, 2);

INSERT INTO totalisator (id, title, manager_id)
VALUES (1, 'CodeAcademy Totalisator 2021', 13),
       (2, 'WorldCup 21 Uber Staff Totalisator', 14),
       (3, 'Šeškinės Ultros', 25);

INSERT INTO user_totalisator (user_id, totalisator_id)
VALUES (25, 1),
       (25, 3),
       (13, 1),
       (14, 2);

-- INSERT INTO user_totalisators (user_id, totalisator_id)
-- VALUES (25, 1),
--        (25, 3),
--        (13, 1),
--        (14, 2);


-- INSERT INTO friendship (id, requester_id, receiver_id)
-- VALUES (1, 25, 14),
--        (2, 25, 21);