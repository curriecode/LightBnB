INSERT INTO users(name, email, password)
VALUES ('Jim Jam', 'jimjam@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Derp Derpington', 'derpington@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Chester Field', 'imacouch@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, province, post_code, active) 
VALUES (1, 'Jazzy Jam house', 'description', 'https://previews.123rf.com/images/briang77/briang770903/briang77090300007/6405346-simple-cartoon-house.jpg', 'https://i.ytimg.com/vi/lnsCiXEQDDI/maxresdefault.jpg', 250, 'Jam Street', 4, 3, 5, 'Jamaica', 'Jellyville', 'Jammin', 'jAmJaM' , true),
(2, 'Derp Manor', 'description', 'https://art.pixilart.com/b8e0304d5c32b58.gif', 'https://i.ytimg.com/vi/vti5hPoku60/maxresdefault.jpg', 150, 'Derp Street', 4, 3, 5, 'Derp Island', 'Derpville', 'Derpin', 'dErPy' , true),
(3, 'Sit Down Suite', 'description', 'https://images-na.ssl-images-amazon.com/images/I/51KbMC3wpOL._SX425_.jpg', 'https://image.shutterstock.com/image-vector/living-room-cozy-interior-colorful-260nw-653252665.jpg', 200, 'Couch Crescent', 2, 1, 3, 'Couchland', 'Potatoville', 'Sitback', 'pOtAto' , true);

INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES ('2019-10-15', '2019-10-18', 1, 2),
('2019-11-15', '2019-11-18', 1, 3),
('2019-12-15', '2019-12-18', 2, 1);

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message )
VALUES (1, 2, 1, 4, 'message'),
(2, 1, 2, 3, 'message'),
(2, 1, 3, 5, 'message');
