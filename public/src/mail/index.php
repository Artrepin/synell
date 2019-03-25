<?
	if(isset($_POST['phone']) || isset($_POST['email_or_phone'])){
		$dt = date("d.m.y");
		$time = date("H:i:s");
		$number = 0;

		$f = fopen("numbervar.txt", "r");
		$number = intval(fgets($f)); 
		fclose($f);

		$servername = '«SYNELL»';
		$title = 'Заявка с сайта '. $servername . ' — ' . $dt;

		$message = '';

		$message .= '<table width="100%">';
		
		$message .= '<tr>';
		$message .= '<td width="20%"><b>Заявка</b></td>';
		$message .= '<td>' . $dt . ' — ' . $number ."</td>";
		$message .= '</tr>';
		
		$message .= '<tr>';
		$message .= '<td width="20%"><b>Время</b></td>';
		$message .= '<td>' . $time ."</td>";
		$message .= '</tr>';
		
		$message .= '<tr>';
		$message .= '<td width="20%"><b>'. 'Форма' . '</b></td>';
		$message .= '<td>' .  $_POST['form'] . "</td>";
		$message .= '</tr>';

		if ($_POST['user'] != ''){
			$message .= '<tr>';
			$message .= '<td width="20%"><b>'. 'Имя' . '</b></td>';
			$message .= '<td>' .  $_POST['user'] . "</td>";
			$message .= '</tr>';		
		}

		if ($_POST['email'] != ''){
			$message .= '<tr>';
			$message .= '<td width="20%"><b>'. 'Email' . '</b></td>';
			$message .= '<td>' .  $_POST['email'] . "</td>";
			$message .= '</tr>';		
		}

		if ($_POST['message'] != ''){
			$message .= '<tr>';
			$message .= '<td width="20%"><b>'. 'Сообщение' . '</b></td>';
			$message .= '<td>' .  $_POST['message'] . "</td>";
			$message .= '</tr>';		
		}

		if ($_POST['scope'] != ''){
			$message .= '<tr>';
			$message .= '<td width="20%"><b>'. 'Область' . '</b></td>';
			$message .= '<td>' .  $_POST['scope'] . "</td>";
			$message .= '</tr>';		
		}

		if ($_POST['messenger'] != ''){
			$message .= '<tr>';
			$message .= '<td width="20%"><b>'. 'Способ для связи' . '</b></td>';
			$message .= '<td>' .  $_POST['messenger'] . "</td>";
			$message .= '</tr>';		
		}

		$message .= '<tr>';
		$message .= '<td width="20%"><b>'. 'Телефон' . '</b></td>';
		$message .= '<td>'  . ' <a href="tel:' . $_POST['phone']  . '">' . $_POST['phone']  . "</a>" .  "</td>";
		$message .= '</tr>';		
		

		$message .= '<tr>';
		$message .= '<td width="20%"><b>'. 'Страница' . '</b></td>';
		$message .= '<td>' .  $_SERVER['HTTP_REFERER'] . "</td>";
		$message .= '</tr>';

		$message .= '</table>';
	 
		

		if (strpos($_SERVER['HTTP_REFERER'], '/en') !== false 
			|| strpos($_SERVER['HTTP_REFERER'], 'en.') !== false) {

			// почты для английской версии

			$to = "leads-en@synell.com"; 

		}else{

			// почты для русской версии

			$to = "leads-ru@synell.com"; 

		}

		if(mail($to, $title, $message, "From: SYNELL <no-reply@admin>". "\r\n" . "Reply-To:  $to" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"")){
			$f = fopen("numbervar.txt", "w");
			$next = $number + 1;
			fwrite($f, $next);
			fclose($f);
		} 
	}
?>       