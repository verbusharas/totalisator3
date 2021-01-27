INSERT INTO user (id, password, username, name, lastname)
VALUES (1, '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'user', 'Paprastas', 'Žmogus'),
       (2, '{bcrypt}$2y$12$putkufw4WFK1XrZv1Za/jOdb1z.F.J9M37VidmaxAclCauk4HMdhm', 'admin', 'Šarūnas', 'Verbus');

INSERT INTO role (id, role_name)
VALUES (1, 'USER'),
       (2, 'ADMIN');

INSERT INTO user_role (user_id, role_id)
VALUES (1, 1),
       (2, 2),
       (2, 1);